"use server";

import { afterLoginUrl } from "@/app-config";
import { signOut as naSignOut, signIn } from "@/auth";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/definitions";
import {
  forgotPasswordUseCase,
  setNewPasswordUseCase,
  signInWithCredentialsUseCase,
  signUpWithCredentialsUseCase,
  verifyNewUserEmailUseCase,
} from "@/use-cases/auth";
import { z } from "zod";
import { createServerAction } from "zsa";

export const signInWithGoogle = async (redirectURL: string | null) => {
  await signIn("google", {
    redirectTo: redirectURL || afterLoginUrl,
  });
};

export const signInWithFacebook = async (redirectURL: string | null) => {
  await signIn("facebook", {
    redirectTo: redirectURL || afterLoginUrl,
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
