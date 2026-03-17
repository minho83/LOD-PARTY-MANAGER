import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="text-gaming-purple">LOD</span>{" "}
            <span className="text-foreground">파티 매니저</span>
          </h1>

          <p className="text-lg text-muted-foreground sm:text-xl">
            파티를 모집하고, 매칭하고, 디스코드에서 바로 소통하세요.
            <br />
            빠르고 간편한 LOD 파티 매칭 서비스.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={ROUTES.PARTIES}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-gaming-purple-light"
            >
              파티 둘러보기
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-3 text-lg font-semibold text-foreground transition-colors hover:bg-accent"
            >
              디스코드로 로그인
            </Link>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="glass-card rounded-xl p-6">
              <div className="mb-3 text-3xl">🎮</div>
              <h3 className="mb-2 text-lg font-semibold">파티 모집</h3>
              <p className="text-sm text-muted-foreground">
                자유양식 또는 템플릿으로 파티를 빠르게 모집하세요.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="mb-3 text-3xl">🔔</div>
              <h3 className="mb-2 text-lg font-semibold">실시간 알림</h3>
              <p className="text-sm text-muted-foreground">
                매칭 완료 시 디스코드 DM으로 즉시 알림을 받으세요.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="mb-3 text-3xl">💬</div>
              <h3 className="mb-2 text-lg font-semibold">디스코드 연동</h3>
              <p className="text-sm text-muted-foreground">
                파티별 전용 채널에서 바로 소통을 시작하세요.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        LOD 파티 매니저 &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
