import { cn } from "@/lib/utils";
import { FC } from "react";

interface OverlayWindowProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const OverlayWindow: FC<OverlayWindowProps> = ({
  children,
  className,
  containerClassName,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-accent transition",
        containerClassName,
      )}
    >
      <div className={cn("duration-300 ease-in-out", className)}>
        {children}
      </div>
    </div>
  );
};

export default OverlayWindow;
