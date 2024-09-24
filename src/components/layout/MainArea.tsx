import { cn } from "@/lib/utils";
import { FC } from "react";

interface MainAreaProps {
  children: React.ReactNode;
  className?: string;
}

const MainArea: FC<MainAreaProps> = ({ className, children }) => {
  return (
    <main
      className={cn(
        "relative flex h-screen w-full flex-1 flex-col overflow-auto",
        className,
      )}
    >
      {children}
    </main>
  );
};

export default MainArea;
