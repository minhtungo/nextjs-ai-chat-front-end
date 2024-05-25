import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <ScrollArea className="h-full w-full flex-1 py-4 lg:py-6">
      <div
        className={cn(
          "mx-auto flex h-full w-full flex-1 flex-col gap-y-5 overflow-hidden px-4 lg:px-6",
          className,
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
};

export default Container;
