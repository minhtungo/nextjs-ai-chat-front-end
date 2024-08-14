import { cn } from "@/lib/utils";
import { FC } from "react";

interface OverlayWindowProps {
  children: React.ReactNode;
  className?: string;
}

const OverlayWindow: FC<OverlayWindowProps> = ({ children, className }) => {
  return (
    <div className="fixed inset-0 z-50 bg-accent transition">
      <div className={cn("duration-300 ease-in-out", className)}>
        {children}
      </div>
    </div>
  );
};

export default OverlayWindow;
