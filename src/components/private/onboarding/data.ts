export const onBoardingSteps = [
  {
    label: "Personalize your learning experience",
    value: "personalize",
  },
  {
    label: "Select your goals",
    value: "goals",
  },
  {
    label: "Set your preferences",
    value: "preferences",
  },
  {
    label: "Finish",
    value: "finish",
  },
];

export type OnboardingStep = (typeof onBoardingSteps)[number];
