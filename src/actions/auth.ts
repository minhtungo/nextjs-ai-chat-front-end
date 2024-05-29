"use server";

import { signOut as naSignOut, signIn } from "@/auth";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { comparePassword, saltAndHashPassword } from "@/lib/security";
import { db } from "@/lib/db";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/definitions";
import {
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/mail";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";

export const signInWithGoogle = async (redirectURL: string | null) => {
  await signIn("google", {
    redirectTo: redirectURL || DEFAULT_LOGIN_REDIRECT,
  });
};

export const signInWithCredentials = async (
  values: z.infer<typeof signInSchema>,
  redirectURL: string | null,
) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "error.invalidFields",
    };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (
    !existingUser ||
    !existingUser.email ||
    !existingUser.password ||
    !existingUser.emailVerified
  ) {
    return { error: "error.invalidCredentials" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "error.tokenInvalid" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "error.invalidCode" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "error.expiredCode" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const passwordMatch = await comparePassword(
        password,
        existingUser.password,
      );

      if (!passwordMatch) {
        return { error: "error.invalidCredentials" };
      }

      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectURL || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "error.invalidCredentials" };
        default:
          return { error: "error.generalError" };
      }
    }

    throw error;
  }
};

export const signUpWithCredentials = async (
  values: z.infer<typeof signUpSchema>,
) => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "error.invalidFields",
    };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    if (!existingUser.emailVerified) {
      const newVerificationToken = await generateVerificationToken(
        existingUser.email,
      );
      return {
        success: "success.signUp",
      };
    }

    return {
      error: "error.emailInUse",
    };
  }

  const hashedPassword = await saltAndHashPassword(password);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      settings: {
        create: {},
      },
    },
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "success.signUp" };
};

export const signOut = async () => {
  await naSignOut({
    redirectTo: "/",
  });
};

export const verifyNewUserEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "error.tokenInvalid" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "error.tokenExpired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "error.invalidVerificationEmail" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date() },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "success.emailVerified" };
};

export const forgotPassword = async (
  values: z.infer<typeof forgotPasswordSchema>,
) => {
  const validatedFields = forgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "error.invalidFields",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "error.invalidVerificationEmail" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {
    success: "success.resetPasswordEmailSent",
  };
};

export const setNewPassword = async (
  values: z.infer<typeof resetPasswordSchema>,
  token: string | null,
) => {
  if (!token) {
    return { error: "error.tokenMissing" };
  }

  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "error.invalidFields",
    };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "error.tokenInvalid" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "error.tokenExpired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "error.invalidVerificationEmail" };
  }

  const hashedPassword = await saltAndHashPassword(password);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "success.passwordChanged" };
};
