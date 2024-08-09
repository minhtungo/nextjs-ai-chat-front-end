import { signOut } from "@/actions/auth";
import {
  changeUserPassword,
  getUserById,
  toggleTwoFactor,
  updateUserOnboarding,
  updateUserProfile,
} from "@/data/user";
import {
  changeUserPasswordSchema,
  onboardingFormSchema,
  twoFactorToggleSchema,
  updateUserProfileSchema,
} from "@/lib/definitions";
import { sendChangePasswordEmail } from "@/lib/mail";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { encodeData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v4 as uuid } from "uuid";

export const updateUserProfileUseCase = async (
  userID: string,
  values: z.infer<typeof updateUserProfileSchema>,
) => {
  const dbUser = await getUserById(userID);
  if (!dbUser) {
    await signOut();
  }

  await updateUserProfile(dbUser?.id!, values);

  revalidatePath(`/${PROTECTED_BASE_URL}/account`);
};

export const onboardingFormUseCase = async (
  userId: string,
  values: z.infer<typeof onboardingFormSchema>,
) => {
  try {
    await updateUserOnboarding({ userId, values });
    return { success: true };
  } catch (error) {
    throw new Error("Error saving onboarding form");
  }
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

export const getTokenUseCase = async (userId: string) => {
  const accessToken = encodeData({
    jti: uuid(),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    uid: userId,
  });

  return accessToken;
};
