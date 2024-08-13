import { onboardingFormAction } from "@/actions/account";
import {
  OnboardingStep,
  onBoardingSteps,
} from "@/components/private/onboarding/data";
import { match } from "@/lib/utils";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { useServerAction } from "zsa-react";

const currentStepAtom = atom<OnboardingStep>(onBoardingSteps[0]);

const completedStatusAtom = atom<boolean>(false);

export const useOnboarding = () => {
  const currentStep = useAtomValue(currentStepAtom);
  const setCurrentStep = useSetAtom(currentStepAtom);
  const completedStatus = useAtomValue(completedStatusAtom);
  const setCompletedStatus = useSetAtom(completedStatusAtom);

  const onCurrentStepChange = useCallback((step: OnboardingStep) => {
    setCurrentStep(step);

    const previousStepIndex = onBoardingSteps.findIndex(
      (s) => s.value === step.value,
    );
    const previousStep = onBoardingSteps[previousStepIndex - 1];

    if (previousStep && previousStep.value !== "finish") {
      setCompletedStatus(false);
    } else {
      setCompletedStatus(true);
    }
  }, []);

  // const isNextStepDisabled = useMemo(
  //   () =>
  //     match<OnboardingStep, string | false>(currentStep, {
  //       personalize: () => false,
  //       goals: () => false,
  //       preferences: () => false,
  //       finish: () => false,
  //     }),
  //   [],
  // );

  const { isPending, execute: onboardUser } =
    useServerAction(onboardingFormAction);

  return {
    currentStep,
    completedStatus,
    setCurrentStep,
    setCompletedStatus,
    onCurrentStepChange,
    isPending,
    onboardUser,
  };
};
