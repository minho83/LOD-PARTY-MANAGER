import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 text-lg font-bold">
          <span className="text-gaming-purple">LOD</span>
          <span className="hidden sm:inline">파티 매니저</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            href={ROUTES.PARTIES}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            파티 목록
          </Link>
          <Link
            href={ROUTES.PARTY_CREATE}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            파티 생성
          </Link>
          <Link
            href={ROUTES.MY_PARTIES}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            내 파티
          </Link>
          <Link
            href={ROUTES.LOGIN}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gaming-purple-light"
          >
            로그인
          </Link>
        </div>
      </nav>
    </header>
  );
}
