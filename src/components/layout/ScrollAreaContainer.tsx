import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface ScrollAreaContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollAreaContainer = ({
  children,
  className,
}: ScrollAreaContainerProps) => {
  return (
    <ScrollArea className="relative h-full w-full flex-1 overflow-hidden">
      <MaxWidthWrapper className={cn("max-w-5xl", className)}>
        {children}
      </MaxWidthWrapper>
    </ScrollArea>
  );
};

export default ScrollAreaContainer;
