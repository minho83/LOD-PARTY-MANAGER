import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import {
  PARTY_STATUS_LABELS,
  PARTY_STATUS_COLORS,
  PARTY_MODE_LABELS,
} from "@/constants/game";
import type { PartyStatus, PartyMode } from "@/generated/prisma/client";

type PartyCardProps = {
  id: string;
  title: string;
  description: string | null;
  mode: PartyMode;
  status: PartyStatus;
  gameMode: string | null;
  tier: string | null;
  maxMembers: number;
  currentCount: number;
  creator: {
    name: string | null;
    image: string | null;
  };
  createdAt: Date;
};

export function PartyCard({ party }: { party: PartyCardProps }) {
  const statusLabel = PARTY_STATUS_LABELS[party.status];
  const statusColor = PARTY_STATUS_COLORS[party.status];
  const modeLabel = PARTY_MODE_LABELS[party.mode];

  return (
    <Link href={ROUTES.PARTY_DETAIL(party.id)} className="block">
      <div className="glass-card rounded-xl p-5 transition-all">
        {/* 헤더: 상태 + 모드 */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {party.status === "RECRUITING" && (
              <span className="inline-block h-2 w-2 animate-pulse-glow rounded-full bg-gaming-green" />
            )}
            <span className={`text-xs font-semibold ${statusColor}`}>
              {statusLabel}
            </span>
          </div>
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {modeLabel}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="mb-2 text-lg font-bold leading-tight">{party.title}</h3>

        {/* 설명 */}
        {party.description && (
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {party.description}
          </p>
        )}

        {/* 태그 */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {party.gameMode && (
            <span className="rounded-md bg-gaming-purple/15 px-2 py-0.5 text-xs text-gaming-purple-light">
              {party.gameMode}
            </span>
          )}
          {party.tier && (
            <span className="rounded-md bg-gaming-blue/15 px-2 py-0.5 text-xs text-gaming-blue">
              {party.tier}
            </span>
          )}
        </div>

        {/* 하단: 인원 + 작성자 */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {party.currentCount}/{party.maxMembers}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {party.creator.image ? (
              <img
                src={party.creator.image}
                alt=""
                className="h-4 w-4 rounded-full"
              />
            ) : (
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gaming-purple text-[10px] font-bold text-white">
                {party.creator.name?.[0] ?? "?"}
              </div>
            )}
            <span>{party.creator.name ?? "알 수 없음"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
