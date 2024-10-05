import { signOut } from "@/features/auth/actions";

import {
  changeUserPassword,
  getUserById,
  updateUser,
  updateUserOnboarding,
  updateUserSettings,
} from "@/data/user";
import { changeUserPasswordSchema } from "@/lib/definitions";
import { sendChangePasswordEmail } from "@/lib/mail";
import { User, UserSettings } from "@prisma/client";
import { z } from "zod";
import { onboardingSchema } from "@/features/onboarding/schemas";

export const updateUserUseCase = async (
  userID: string,
  values: Partial<User>,
) => {
  const dbUser = await getUserById(userID);

  if (!dbUser) {
    await signOut();
  }

  await updateUser(dbUser?.id!, values);
};

export const updateUserSettingsUseCase = async (
  userID: string,
  values: Partial<UserSettings>,
) => {
  const dbUser = await getUserById(userID);

  if (!dbUser) {
    throw new Error("User not found");
  }

  await updateUserSettings(dbUser.id, values);
};

export const onboardingFormUseCase = async (
  userId: string,
  values: z.infer<typeof onboardingSchema>,
) => {
  try {
    await updateUserOnboarding({ userId, values });
    return { success: true };
  } catch (error) {
    throw new Error("Error saving onboarding form");
  }
};

// export const toggleTwoFactorUseCase = async (
//   userID: string,
//   values: z.infer<typeof twoFactorToggleSchema>,
// ) => {
//   const dbUser = await getUserById(userID);

//   if (!dbUser) {
//     throw new Error("User not found");
//   }

//   await toggleTwoFactor(dbUser.id, values);
// };

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
