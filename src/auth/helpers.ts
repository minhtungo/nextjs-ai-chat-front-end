"use server";

import { signIn, signOut as naSignOut } from "@/auth";

export const signInWithGoogle = async () => {
  await signIn("google");
};

export const signInWithCredentials = async () => {
  await signIn();
};

export const signOut = async () => {
  await naSignOut();
};
