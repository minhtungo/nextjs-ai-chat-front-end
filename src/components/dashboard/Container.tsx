import { cn } from "@/lib/utils";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container = React.forwardRef<
  React.HTMLAttributes<HTMLDivElement>,
  ContainerProps
>(({ children, className, ...props }, ref) => {
  return (
    <ScrollArea
      className="h-full w-full flex-1 py-4 lg:py-6"
      ref={ref}
      {...props}
    >
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
});

Container.displayName = "Container";

export default Container;
