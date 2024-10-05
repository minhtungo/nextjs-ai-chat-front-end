import { onboardingSchema } from "@/features/onboarding/schemas";
import { authenticatedAction } from "@/lib/safe-actions";
import { onboardingFormUseCase } from "@/use-cases/user";

export const onboardingFormAction = authenticatedAction
  .input(onboardingSchema)
  .handler(async ({ input: values, ctx: { user } }) => {
    return await onboardingFormUseCase(user.id!, values);
  });
