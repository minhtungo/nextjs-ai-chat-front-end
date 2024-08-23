"use server";

import {
  changeUserPasswordSchema,
  onboardingSchema,
  updateUserProfileSchema,
  updateUserSettingsSchema,
} from "@/lib/definitions";
import { authedAction } from "@/lib/safe-actions";
import {
  changeUserPasswordUseCase,
  onboardingFormUseCase,
  updateUserSettingsUseCase,
  updateUserUseCase,
} from "@/use-cases/user";

import { cookies } from "next/headers";

export const updatePreferredLang = (nextLocale: string) => {
  cookies().set("preferredLang", nextLocale);
};

export const updateUserAction = authedAction
  .input(updateUserProfileSchema)
  .handler(async ({ input, ctx: { user } }) => {
    await updateUserUseCase(user.id!, input);
  });

export const updateUserSettingsAction = authedAction
  .input(updateUserSettingsSchema)
  .handler(async ({ input, ctx: { user } }) => {
    await updateUserSettingsUseCase(user.id!, input);
  });

export const onboardingFormAction = authedAction
  .input(onboardingSchema)
  .handler(async ({ input: values, ctx: { user } }) => {
    return await onboardingFormUseCase(user.id!, values);
  });

// export const toggleTwoFactorAction = authedAction
//   .input(twoFactorToggleSchema)
//   .handler(async ({ input, ctx: { user } }) => {
//     await toggleTwoFactorUseCase(user.id!, input);
//   });

export const changeUserPasswordAction = authedAction
  .input(changeUserPasswordSchema)
  .handler(async ({ input, ctx: { user } }) => {
    if (user.isOauth) {
      throw new Error("User is not authenticated");
    }

    await changeUserPasswordUseCase(user.id!, input);
  });
