import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FC } from "react";

interface StepperProps {
  steps: {
    label: string;
    value: string;
  }[];
  currentStepIndex: number;
}

const Stepper: FC<StepperProps> = ({ steps, currentStepIndex }) => {
  return (
    <ul className="relative flex w-full flex-col gap-2 md:flex-row">
      {steps.map((step, index) => (
        <li className="group flex flex-1 shrink basis-0 flex-col gap-x-2 md:flex-row md:items-center">
          <div className="inline-flex min-h-7 min-w-7 grow items-center align-middle text-xs md:grow-0">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full font-semibold",
                index <= currentStepIndex &&
                  "bg-primary text-primary-foreground",
              )}
            >
              {currentStepIndex > 0 && index < currentStepIndex ? (
                <Check className="size-4" />
              ) : (
                index + 1
              )}
            </span>
            <span className="ms-2 block grow text-sm font-medium md:grow-0">
              {step.label}
            </span>
          </div>
          <div className="ms-3.5 mt-2 h-4 w-px bg-muted group-last:hidden md:ms-0 md:mt-0 md:h-px md:w-full md:flex-1"></div>
        </li>
      ))}
    </ul>
  );
};

export default Stepper;
