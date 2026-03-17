import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const errorMessages: Record<string, string> = {
    Configuration: "서버 설정 오류가 발생했습니다.",
    AccessDenied: "접근이 거부되었습니다.",
    Verification: "인증 토큰이 만료되었습니다.",
    Default: "로그인 중 문제가 발생했습니다. 다시 시도해주세요.",
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="glass-card max-w-md rounded-2xl p-8 text-center">
        <div className="mb-4 text-5xl">⚠️</div>
        <h1 className="mb-2 text-2xl font-bold">로그인 오류</h1>
        <p className="mb-2 text-muted-foreground">
          {errorMessages[error ?? ""] ?? errorMessages.Default}
        </p>
        {error && (
          <p className="mb-6 text-xs text-muted-foreground/60">
            에러 코드: {error}
          </p>
        )}
        <Link
          href={ROUTES.LOGIN}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-colors hover:bg-gaming-purple-light"
        >
          다시 로그인
        </Link>
      </div>
    </div>
  );
}
