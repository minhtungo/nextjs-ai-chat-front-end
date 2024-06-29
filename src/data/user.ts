import { db } from "@/lib/db";
import {
  changeUserPasswordSchema,
  twoFactorToggleSchema,
  updateUserProfileSchema,
} from "@/lib/definitions";
import { comparePassword, saltAndHashPassword } from "@/lib/security";
import { Languages, User } from "@prisma/client";
import { z } from "zod";

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: { email },
      include: { settings: true },
    });
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    return await db.user.findUnique({
      where: { id },
      include: {
        settings: true,
        accounts: {
          select: {
            type: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
};

export const createUser = async (user: User) => {
  return await db.user.create({
    data: user,
  });
};

export const updateUserSettings = async (
  userID: string,
  values: z.infer<typeof updateUserProfileSchema>,
) => {
  const { name, language } = values;

  await db.user.update({
    where: { id: userID },
    data: {
      name,
      settings: {
        update: {
          preferredLang: language.toUpperCase() as Languages,
        },
      },
    },
  });
};

export const toggleTwoFactor = async (
  userID: string,
  values: z.infer<typeof twoFactorToggleSchema>,
) => {
  await db.user.update({
    where: { id: userID },
    data: {
      ...values,
    },
  });
};

export const getUserAndSettingsById = async (id: string | undefined) => {
  try {
    return await db.user.findUnique({
      where: { id },
      include: { settings: true },
    });
  } catch (error) {
    return null;
  }
};

export const changeUserPassword = async (
  userID: string,
  userPassword: string,
  values: z.infer<typeof changeUserPasswordSchema>,
) => {
  const { password, newPassword } = values;

  const passwordMatch = await comparePassword(password, userPassword);

  if (!passwordMatch) {
    throw new Error("Password mismatch");
  }

  const hashedPassword = await saltAndHashPassword(newPassword);

  await db.user.update({
    where: { id: userID },
    data: {
      password: hashedPassword,
    },
  });
};
