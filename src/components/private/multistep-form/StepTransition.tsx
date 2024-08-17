import { cn } from "@/lib/utils";

interface StepTransitionProps {
  direction: "forward" | "backward" | undefined;
  isActive: boolean;
}

const StepTransition = ({
  direction,
  isActive,
  children,
}: React.PropsWithChildren<StepTransitionProps>) => {
  const baseClasses = "flex-shrink-0 p-1";

  const activeClasses = isActive
    ? "opacity-100 translate-x-0 h-full"
    : "opacity-0 pointer-events-none absolute";

  // const directionClasses = isActive
  //   ? ""
  //   : direction === "forward"
  //     ? "-translate-x-full"
  //     : "translate-x-full";

  return <div className={cn(baseClasses, activeClasses)}>{children}</div>;
};

export default StepTransition;
