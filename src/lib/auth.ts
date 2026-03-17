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
      // Discord 프로필 → DB User 매핑
      profile(profile) {
        return {
          id: profile.id,
          name: profile.global_name ?? profile.username,
          email: profile.email,
          image: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`
            : null,
          discordId: profile.id,
          discordUsername: profile.username,
          discordGlobalName: profile.global_name ?? null,
          discordAvatar: profile.avatar ?? null,
        };
      },
    }),
  ],
  callbacks: {
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
