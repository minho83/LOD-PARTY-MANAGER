import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      authorization: {
        params: { scope: "identify email guilds" },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          discordId: true,
          discordUsername: true,
          role: true,
          preferredPosition: true,
          tier: true,
        },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.discordId = dbUser.discordId;
        session.user.discordUsername = dbUser.discordUsername;
        session.user.role = dbUser.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
  },
});
