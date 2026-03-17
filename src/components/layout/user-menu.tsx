"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { signOutAction } from "@/lib/actions";

interface UserMenuProps {
  user: {
    name?: string | null;
    image?: string | null;
    discordUsername?: string;
    role?: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user.name || user.discordUsername || "유저";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent cursor-pointer"
      >
        {/* 아바타 */}
        {user.image ? (
          <Image
            src={user.image}
            alt={displayName}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gaming-purple text-sm font-bold text-white">
            {initial}
          </div>
        )}
        <span className="hidden text-sm font-medium sm:inline">
          {displayName}
        </span>
        {/* 드롭다운 화살표 */}
        <svg
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-background/95 p-1 shadow-xl backdrop-blur-md">
          {/* 유저 정보 */}
          <div className="border-b border-border px-3 py-2">
            <p className="text-sm font-semibold">{displayName}</p>
            {user.discordUsername && (
              <p className="text-xs text-muted-foreground">@{user.discordUsername}</p>
            )}
            {user.role === "ADMIN" && (
              <span className="mt-1 inline-block rounded-full bg-gaming-purple/20 px-2 py-0.5 text-xs font-medium text-gaming-purple">
                관리자
              </span>
            )}
          </div>

          {/* 메뉴 링크 */}
          <div className="py-1">
            <MenuLink href={ROUTES.MY_PARTIES} onClick={() => setOpen(false)}>
              🎮 내 파티
            </MenuLink>
            <MenuLink href={ROUTES.MY_APPLICATIONS} onClick={() => setOpen(false)}>
              📋 신청 내역
            </MenuLink>
            <MenuLink href={ROUTES.MY_BOOKMARKS} onClick={() => setOpen(false)}>
              ⭐ 즐겨찾기
            </MenuLink>
            <MenuLink href={ROUTES.MY_NOTIFICATIONS} onClick={() => setOpen(false)}>
              🔔 알림
            </MenuLink>
          </div>

          <div className="border-t border-border py-1">
            <MenuLink href={ROUTES.PROFILE} onClick={() => setOpen(false)}>
              👤 프로필 설정
            </MenuLink>
            {user.role === "ADMIN" && (
              <MenuLink href={ROUTES.ADMIN} onClick={() => setOpen(false)}>
                ⚙️ 관리자
              </MenuLink>
            )}
          </div>

          <div className="border-t border-border py-1">
            <form action={signOutAction}>
              <button
                type="submit"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10 cursor-pointer"
              >
                🚪 로그아웃
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </Link>
  );
}
