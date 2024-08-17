import StepTransition from "@/components/private/multistep-form/StepTransition";
import { Card, CardContent } from "@/components/ui/card";
import { MultiStepFormStep } from "@/components/ui/multistep-form";
import { useMultiStepForm } from "@/hooks/use-multistep-form";
import {
  MultiStepFormContext,
  useMultiStepFormContext,
} from "@/hooks/use-multistep-form-context";
import { MultiStepFormProps, StepProps } from "@/types";
import React, { useMemo } from "react";
import { z } from "zod";

export function MultiStepForm<T extends z.ZodType>({
  schema,
  form,
  onSubmit,
  children,
  header,
  footer,
}: React.PropsWithChildren<MultiStepFormProps<T>>) {
  const steps = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement<StepProps> =>
          React.isValidElement(child) && child.type === MultiStepFormStep,
      ),
    [children],
  );

  const stepNames = steps.map((step) => step.props.name);
  const multiStepForm = useMultiStepForm(schema, form, stepNames);

  return (
    <MultiStepFormContext.Provider value={multiStepForm}>
      <Card className="mx-auto w-full max-w-2xl sm:p-8" noBorderMobile>
        <CardContent className="pb-0">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {header ?? null}
            <div className="relative transition-transform duration-200">
              {steps.map((step, index) => {
                const isActive = index === multiStepForm.currentStepIndex;

                return (
                  <StepTransition
                    key={step.props.name}
                    direction={multiStepForm.direction}
                    isActive={isActive}
                  >
                    {step}
                  </StepTransition>
                );
              })}
            </div>

            {footer ?? null}
          </form>
        </CardContent>
      </Card>
    </MultiStepFormContext.Provider>
  );
}

export function MultiStepFormContextProvider(props: {
  children: (context: ReturnType<typeof useMultiStepForm>) => React.ReactNode;
}) {
  const ctx = useMultiStepFormContext();

  if (Array.isArray(props.children)) {
    const [child] = props.children;

    return (
      child as (context: ReturnType<typeof useMultiStepForm>) => React.ReactNode
    )(ctx);
  }

  return props.children(ctx);
}
