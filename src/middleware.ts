import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 환경변수가 설정되기 전까지는 기본 미들웨어만 사용
// Auth.js 설정 완료 후 auth() 미들웨어로 교체 예정
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
