"use server";

import { afterLoginUrl } from "@/config/config";
import { signOut as naSignOut, signIn } from "@/auth";

import {
  forgotPasswordUseCase,
  sendVerificationEmailUseCase,
  setNewPasswordUseCase,
  signInWithCredentialsUseCase,
  signUpWithCredentialsUseCase,
  verifyNewUserEmailUseCase,
} from "@/use-cases/auth";
import { z } from "zod";
import { createServerAction } from "zsa";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/features/auth/schemas";

export const signInWithProvider = async (
  provider: "google" | "facebook",
  {
    redirectTo,
  }: {
    redirectTo: string;
  },
) => {
  await signIn(provider, {
    redirectTo: redirectTo || afterLoginUrl,
  });
};

export const signInWithCredentialsAction = createServerAction()
  .input(
    z.object({
      values: signInSchema,
      redirectURL: z.string().nullable(),
    }),
  )
  .handler(async ({ input }) => {
    return await signInWithCredentialsUseCase(input);
  });

export const signUpWithCredentialsAction = createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    return await signUpWithCredentialsUseCase(input);
  });

export const signOut = async () => {
  await naSignOut({
    redirectTo: "/",
  });
};

export const sendVerificationEmailAction = createServerAction()
  .input(z.string())
  .handler(async ({ input: token }) => {
    return await sendVerificationEmailUseCase(token);
  });

export const verifyNewUserEmailAction = createServerAction()
  .input(z.string())
  .handler(async ({ input: token }) => {
    return await verifyNewUserEmailUseCase(token);
  });

export const forgotPasswordAction = createServerAction()
  .input(forgotPasswordSchema)
  .handler(async ({ input }) => {
    return await forgotPasswordUseCase(input);
  });

export const setNewPasswordAction = createServerAction()
  .input(
    z.object({
      values: resetPasswordSchema,
      token: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    return await setNewPasswordUseCase(input);
  });
