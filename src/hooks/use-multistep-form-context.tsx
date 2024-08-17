import { createContext, useContext } from "react";
import { useMultiStepForm } from "@/hooks/use-multistep-form";

export const MultiStepFormContext = createContext<ReturnType<
  typeof useMultiStepForm
> | null>(null);

export function useMultiStepFormContext() {
  const context = useContext(MultiStepFormContext);

  if (!context) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepForm",
    );
  }

  return context;
}
