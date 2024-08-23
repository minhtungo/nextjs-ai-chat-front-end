import { cn } from "@/lib/utils";
import { FC } from "react";

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "text-brand size.3.5 inline-block animate-spin rounded-full border-[2px] border-current border-t-transparent",
        className,
      )}
      role="status"
      aria-label="loading"
    />
  );
};

export default Spinner;
