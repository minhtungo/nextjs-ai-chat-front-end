"use server";

import { signOut as naSignOut, signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { saltAndHashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { signInSchema, signUpSchema } from "@/lib/definitions";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";

export const signInWithGoogle = async () => {
  await signIn("google", {
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};

export const signInWithCredentials = async (
  values: z.infer<typeof signInSchema>,
) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (
    !existingUser ||
    !existingUser.email ||
    !existingUser.password ||
    !existingUser.emailVerified
  ) {
    return { error: "Invalid credentials" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
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
      error: "Invalid fields",
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
        success:
          "You have to verify your email first. We just sent a new verification email.",
      };
    }

    return {
      error: "Email đã được sử dụng",
    };
  }

  const hashedPassword = await saltAndHashPassword(password);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Sent" };
};

export const signOut = async () => {
  await naSignOut({
    redirectTo: "/",
  });
};
