import { signOut } from "@/actions/auth";
import {
  changeUserPassword,
  getUserById,
  toggleTwoFactor,
  updateUserSettings,
} from "@/data/user";
import {
  changeUserPasswordSchema,
  twoFactorToggleSchema,
  updateUserProfileSchema,
} from "@/lib/definitions";
import { sendChangePasswordEmail } from "@/lib/mail";
import { z } from "zod";

export const updateUserProfileUseCase = async (
  userID: string,
  values: z.infer<typeof updateUserProfileSchema>,
) => {
  const dbUser = await getUserById(userID);

  if (!dbUser) {
    await signOut();
    throw new Error("User not found");
  }

  await updateUserSettings(dbUser.id, values);
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
