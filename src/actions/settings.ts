"use server";

import { z } from "zod";
import { updateUserProfileSchema } from "./../lib/definitions";
import { getCurrentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

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
