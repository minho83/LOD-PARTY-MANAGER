import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar p-6">
        <h2 className="mb-6 text-lg font-bold text-sidebar-foreground">
          <span className="text-gaming-purple">관리자</span> 패널
        </h2>
        <nav className="flex flex-col gap-2">
          <Link
            href={ROUTES.ADMIN}
            className="rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            대시보드
          </Link>
          <Link
            href={ROUTES.ADMIN_TEMPLATES}
            className="rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            템플릿 관리
          </Link>
          <Link
            href={ROUTES.ADMIN_USERS}
            className="rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            유저 관리
          </Link>
          <Link
            href={ROUTES.HOME}
            className="mt-4 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent"
          >
            ← 메인으로
          </Link>
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
