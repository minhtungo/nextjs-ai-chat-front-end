import { cn } from "@/lib/utils";
import { FC } from "react";

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "text-brand inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent",
        className,
      )}
      role="status"
      aria-label="loading"
    />
  );
};

export default Spinner;
