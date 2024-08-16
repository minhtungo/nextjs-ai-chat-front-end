import { OnboardingStep } from "@/components/private/onboarding/data";
import { onBoardingSteps } from "@/lib/constant";
import { atom } from "jotai";

export const currentStepAtom = atom<OnboardingStep>(onBoardingSteps[0]);
