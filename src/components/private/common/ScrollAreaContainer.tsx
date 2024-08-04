import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { FC } from "react";

interface ScrollAreaContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const ScrollAreaContainer: FC<ScrollAreaContainerProps> = ({
  children,
  className,
}) => {
  return (
    <ScrollArea className="h-full w-full flex-1">
      <MaxWidthWrapper className={className}>{children}</MaxWidthWrapper>
    </ScrollArea>
  );
};

export default ScrollAreaContainer;
