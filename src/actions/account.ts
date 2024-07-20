"use server";

import { authedAction } from "@/lib/safe-actions";
import {
  changeUserPasswordUseCase,
  onboardingFormUseCase,
  toggleTwoFactorUseCase,
  updateUserProfileUseCase,
} from "@/use-cases/user";
import {
  changeUserPasswordSchema,
  onboardingFormSchema,
  twoFactorToggleSchema,
  updateUserProfileSchema,
} from "../lib/definitions";

export const updateUserProfileAction = authedAction
  .input(updateUserProfileSchema)
  .handler(async ({ input, ctx: { user } }) => {
    await updateUserProfileUseCase(user.id!, input);
  });

export const onboardingFormAction = authedAction
  .input(onboardingFormSchema)
  .handler(async ({ input, ctx: { user } }) => {
    return await onboardingFormUseCase(user.id!, input);
  });

export const toggleTwoFactorAction = authedAction
  .input(twoFactorToggleSchema)
  .handler(async ({ input, ctx: { user } }) => {
    await toggleTwoFactorUseCase(user.id!, input);
  });

export const changeUserPasswordAction = authedAction
  .input(changeUserPasswordSchema)
  .handler(async ({ input, ctx: { user } }) => {
    if (user.isOauth) {
      throw new Error("User is not authenticated");
    }

    await changeUserPasswordUseCase(user.id!, input);
  });
