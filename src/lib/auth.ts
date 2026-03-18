import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      authorization: {
        params: { scope: "identify email guilds" },
      },
      // 표준 필드만 반환 (커스텀 필드는 signIn 콜백에서 처리)
      profile(profile) {
        return {
          id: profile.id,
          name: profile.global_name ?? profile.username,
          email: profile.email,
          image: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`
            : null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Discord 로그인 시 커스텀 필드 업데이트
      if (account?.provider === "discord" && profile && user.id) {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              discordId: profile.id as string,
              discordUsername: (profile as Record<string, unknown>).username as string,
              discordGlobalName: ((profile as Record<string, unknown>).global_name as string) ?? null,
              discordAvatar: ((profile as Record<string, unknown>).avatar as string) ?? null,
            },
          });
        } catch {
          // 첫 로그인 시 user가 아직 생성 중일 수 있음 - 무시
        }
      }
      return true;
    },
    async session({ session, user }) {
      // user 객체는 DB adapter 사용 시 DB에서 가져온 유저
      session.user.id = user.id;
      // 추가 필드는 타입 안전하게 가져오기
      const u = user as typeof user & {
        discordId?: string;
        discordUsername?: string;
        role?: string;
      };
      if (u.discordId) session.user.discordId = u.discordId;
      if (u.discordUsername) session.user.discordUsername = u.discordUsername;
      if (u.role) session.user.role = u.role as "USER" | "ADMIN";
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
});
