"use server";

import { signIn, signOut } from "@/lib/auth";

export async function signInWithDiscord() {
  await signIn("discord", { redirectTo: "/parties" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
