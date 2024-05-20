"use server";

import { signOut as naSignOut, signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { saltAndHashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { signInSchema, signUpSchema } from "@/lib/definitions";
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
  const hashedPassword = await saltAndHashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email đã được sử dụng",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);

  return { success: "Sent" };
};

export const signOut = async () => {
  await naSignOut({
    redirectTo: "/",
  });
};
