import { createStepSchema } from "@/lib/utils";
import { z } from "zod";

export const onboardingSchema = createStepSchema({
  academic: z.object({
    level: z.string(),
    subjects: z.array(z.string()),
  }),
  goals: z.object({
    goals: z.array(z.string()),
  }),
});
