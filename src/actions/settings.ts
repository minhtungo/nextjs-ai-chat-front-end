"use server";

import { z } from "zod";
import {
  changeUserPasswordSchema,
  twoFactorToggleSchema,
  updateUserProfileSchema,
} from "./../lib/definitions";
import { getCurrentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { comparePassword, saltAndHashPassword } from "@/lib/security";

export const updateUserProfile = async (
  values: z.infer<typeof updateUserProfileSchema>,
) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated" };
};

export const toggleTwoFactor = async (
  values: z.infer<typeof twoFactorToggleSchema>,
) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Updated" };
};

export const changeUserPassword = async (
  values: z.infer<typeof changeUserPasswordSchema>,
) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOauth) {
    return { error: "Unauthorized" };
  }

  const { password, newPassword } = values;

  if (dbUser.password) {
    const passwordMatch = await comparePassword(password, dbUser.password);

    if (!passwordMatch) {
      return { error: "Mật khẩu cũ không đúng" };
    }

    const hashedPassword = await saltAndHashPassword(newPassword);

    await db.user.update({
      where: { id: dbUser.id },
      data: {
        password: hashedPassword,
      },
    });

    return { success: "Đổi mật khẩu thành công" };
  }
};
