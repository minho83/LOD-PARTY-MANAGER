import { z } from "zod";
import {
  GAME_MODES,
  TIERS,
  MIN_PARTY_SIZE,
  MAX_PARTY_SIZE,
  DEFAULT_PARTY_SIZE,
} from "@/constants/game";

export const createPartySchema = z.object({
  title: z
    .string()
    .min(2, "제목은 2자 이상 입력해주세요")
    .max(50, "제목은 50자 이내로 입력해주세요"),
  description: z
    .string()
    .max(500, "설명은 500자 이내로 입력해주세요")
    .optional()
    .or(z.literal("")),
  mode: z.enum(["FREE_FORM", "TEMPLATE"]),
  gameMode: z
    .enum(GAME_MODES)
    .optional()
    .or(z.literal("")),
  tier: z
    .enum(TIERS)
    .optional()
    .or(z.literal("")),
  maxMembers: z.coerce
    .number()
    .int()
    .min(MIN_PARTY_SIZE, `최소 ${MIN_PARTY_SIZE}명`)
    .max(MAX_PARTY_SIZE, `최대 ${MAX_PARTY_SIZE}명`)
    .default(DEFAULT_PARTY_SIZE),
  templateId: z.string().optional().or(z.literal("")),
  templateData: z.record(z.string(), z.unknown()).optional(),
});

export type CreatePartyInput = z.input<typeof createPartySchema>;
export type CreatePartyOutput = z.infer<typeof createPartySchema>;

/** 서버 측 추가 검증 (템플릿 모드일 때 templateId 필수) */
export function validateCreateParty(data: CreatePartyInput) {
  if (data.mode === "TEMPLATE" && !data.templateId) {
    return { success: false as const, error: "템플릿을 선택해주세요" };
  }
  return { success: true as const };
}
