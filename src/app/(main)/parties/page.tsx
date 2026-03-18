import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ROUTES } from "@/constants/routes";
import { PartyCard } from "@/components/party/party-card";

export default async function PartiesPage() {
  const session = await auth();

  const parties = await prisma.party.findMany({
    where: { status: "RECRUITING" },
    include: {
      creator: {
        select: { name: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">파티 모집</h1>
          <p className="mt-1 text-muted-foreground">
            현재 모집 중인 파티를 찾아보세요.
          </p>
        </div>
        {session?.user && (
          <Link
            href={ROUTES.PARTY_CREATE}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gaming-purple-light"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            파티 만들기
          </Link>
        )}
      </div>

      {/* 환영 메시지 (로그인 상태일 때) */}
      {session?.user && (
        <div className="mb-6 rounded-xl border border-gaming-purple/30 bg-gaming-purple/5 p-4">
          <p className="text-sm">
            🎮 <span className="font-semibold text-gaming-purple">{session.user.name}</span>님, 환영합니다! 파티를 생성하거나 모집 중인 파티에 참가해보세요.
          </p>
        </div>
      )}

      {/* 파티 목록 */}
      {parties.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {parties.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      ) : (
        <div className="glass-card flex flex-col items-center justify-center rounded-xl p-12 text-center">
          <div className="mb-4 text-5xl">🎮</div>
          <h3 className="mb-2 text-lg font-semibold">
            아직 모집 중인 파티가 없습니다
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            첫 번째 파티를 만들어보세요!
          </p>
          {session?.user ? (
            <Link
              href={ROUTES.PARTY_CREATE}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-colors hover:bg-gaming-purple-light"
            >
              파티 만들기
            </Link>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-6 py-2 font-semibold text-white transition-colors hover:bg-[#4752C4]"
            >
              디스코드로 로그인
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
