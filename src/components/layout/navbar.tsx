import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { auth } from "@/lib/auth";
import { UserMenu } from "./user-menu";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 text-lg font-bold">
          <span className="text-gaming-purple">LOD</span>
          <span className="hidden sm:inline">파티 매니저</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            href={ROUTES.PARTIES}
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            파티 목록
          </Link>

          {session?.user && (
            <Link
              href={ROUTES.PARTY_CREATE}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              파티 생성
            </Link>
          )}

          {/* 로그인 상태에 따라 분기 */}
          {session?.user ? (
            <UserMenu
              user={{
                name: session.user.name,
                image: session.user.image,
                discordUsername: session.user.discordUsername,
                role: session.user.role,
              }}
            />
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gaming-purple-light"
            >
              로그인
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
