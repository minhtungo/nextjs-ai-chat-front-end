"use server";

import { accountUrl } from "@/config/config";
import {
  changeUserPasswordSchema,
  updateUserProfileSchema,
  updateUserSettingsSchema,
} from "@/features/account/schemas";
import { authenticatedAction } from "@/lib/safe-actions";
import {
  changeUserPasswordUseCase,
  updateUserSettingsUseCase,
  updateUserUseCase,
} from "@/use-cases/user";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

export const updatePreferredLang = (nextLocale: string) => {
  cookies().set("preferredLang", nextLocale);
};

export const updateUserAction = authenticatedAction
  .input(updateUserProfileSchema)
  .handler(async ({ input, ctx: { user } }) => {
    await updateUserUseCase(user.id!, input);
    revalidatePath(`${accountUrl}`);
  });

export const updateUserSettingsAction = authenticatedAction
  .input(updateUserSettingsSchema)
  .handler(async ({ input: values, ctx: { user } }) => {
    await updateUserSettingsUseCase(user.id!, values);
    revalidatePath(`${accountUrl}`);
  });

export const changeUserPasswordAction = authenticatedAction
  .input(changeUserPasswordSchema)
  .handler(async ({ input, ctx: { user } }) => {
    if (user.isOauth) {
      throw new Error("User is not authenticated");
    }

    await changeUserPasswordUseCase(user.id!, input);
    revalidatePath(`${accountUrl}`);
  });
