import { signOut } from "@/actions/auth";
import {
  changeUserPassword,
  getUserById,
  toggleTwoFactor,
  updateUserProfile,
} from "@/data/user";
import {
  changeUserPasswordSchema,
  twoFactorToggleSchema,
  updateUserProfileSchema,
} from "@/lib/definitions";
import { sendChangePasswordEmail } from "@/lib/mail";
import { PROTECTED_BASE_URL } from "@/routes";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateUserProfileUseCase = async (
  userID: string,
  values: z.infer<typeof updateUserProfileSchema>,
) => {
  const dbUser = await getUserById(userID);
  if (!dbUser) {
    await signOut();
  }

  await updateUserProfile(dbUser?.id!, values);

  revalidatePath(`/${PROTECTED_BASE_URL}/settings`);
};

export const toggleTwoFactorUseCase = async (
  userID: string,
  values: z.infer<typeof twoFactorToggleSchema>,
) => {
  const dbUser = await getUserById(userID);

  if (!dbUser) {
    throw new Error("User not found");
  }

  await toggleTwoFactor(dbUser.id, values);
};

export const changeUserPasswordUseCase = async (
  userID: string,
  values: z.infer<typeof changeUserPasswordSchema>,
) => {
  const dbUser = await getUserById(userID);

  if (!dbUser) {
    throw new Error("User not found");
  }

  if (dbUser.password) {
    await changeUserPassword(dbUser.id, dbUser.password, values);

    sendChangePasswordEmail(dbUser.email, dbUser?.name!);
  }
};
