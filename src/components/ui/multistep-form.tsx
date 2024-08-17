import React, { HTMLProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export const MultiStepFormStep = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return <Comp className={cn(className)} ref={ref} {...props} />;
});

export const MultiStepFormHeader = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return <Comp className={cn(className)} ref={ref} {...props} />;
});

export const MultiStepFormFooter = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    {
      asChild?: boolean;
    } & HTMLProps<HTMLDivElement>
  >
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return <Comp className={cn(className)} ref={ref} {...props} />;
});
