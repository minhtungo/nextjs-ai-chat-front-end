"use server";

import { authedProcedure } from "@/lib/safe-actions";
import {
  changeUserPasswordUseCase,
  toggleTwoFactorUseCase,
  updateUserProfileUseCase,
} from "@/use-cases/user";
import {
  changeUserPasswordSchema,
  twoFactorToggleSchema,
  updateUserProfileSchema,
} from "./../lib/definitions";

export const updateUserProfileAction = authedProcedure
  .input(updateUserProfileSchema)
  .handler(async ({ input, ctx: { user } }) => {
    await updateUserProfileUseCase(user.id!, input);
  });

export const toggleTwoFactorAction = authedProcedure
  .input(twoFactorToggleSchema)
  .handler(async ({ input, ctx: { user } }) => {
    await toggleTwoFactorUseCase(user.id!, input);
  });

export const changeUserPasswordAction = authedProcedure
  .input(changeUserPasswordSchema)
  .handler(async ({ input, ctx: { user } }) => {
    if (user.isOauth) {
      throw new Error("User is not authenticated");
    }

    await changeUserPasswordUseCase(user.id!, input);
  });
