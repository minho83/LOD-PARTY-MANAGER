"use server";

import { signIn, signOut, auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { createPartySchema, validateCreateParty, type CreatePartyInput, type CreatePartyOutput } from "@/lib/validations/party";
import { ROUTES } from "@/constants/routes";
import { PARTY_EXPIRY_DAYS } from "@/constants/game";

export async function signInWithDiscord() {
  await signIn("discord", { redirectTo: "/parties" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function getActiveTemplates() {
  const templates = await prisma.formTemplate.findMany({
    where: { isActive: true },
    include: {
      fields: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });
  return templates;
}

export type ActionResult = {
  success: boolean;
  error?: string;
  partyId?: string;
};

export async function createParty(input: CreatePartyInput): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "로그인이 필요합니다" };
  }

  const parsed = createPartySchema.safeParse(input);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { success: false, error: firstIssue?.message ?? "입력값이 올바르지 않습니다" };
  }

  const data: CreatePartyOutput = parsed.data;

  const extra = validateCreateParty(data);
  if (!extra.success) {
    return { success: false, error: extra.error };
  }

  try {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + PARTY_EXPIRY_DAYS);

    const party = await prisma.$transaction(async (tx) => {
      const newParty = await tx.party.create({
        data: {
          title: data.title,
          description: data.description || null,
          mode: data.mode,
          gameMode: data.gameMode || null,
          tier: data.tier || null,
          maxMembers: data.maxMembers,
          templateId: data.mode === "TEMPLATE" ? data.templateId || null : null,
          templateData: data.mode === "TEMPLATE" && data.templateData
            ? (data.templateData as Record<string, string>)
            : undefined,
          creatorId: session.user.id,
          expiresAt,
        },
      });

      // 생성자를 LEADER로 PartyMember에 추가
      await tx.partyMember.create({
        data: {
          partyId: newParty.id,
          userId: session.user.id,
          role: "LEADER",
          status: "ACCEPTED",
        },
      });

      return newParty;
    });

    redirect(ROUTES.PARTY_DETAIL(party.id));
  } catch (error) {
    // redirect()는 내부적으로 에러를 throw하므로, NEXT_REDIRECT는 다시 throw
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    // Next.js redirect는 특수한 에러 객체를 throw
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: string }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("파티 생성 실패:", error);
    return { success: false, error: "파티 생성에 실패했습니다. 다시 시도해주세요." };
  }
}
