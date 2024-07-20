import MaxWidthWrapper from "@/components/common/Container";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { FC } from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <ScrollArea className="h-full w-full flex-1 py-4 lg:py-6">
      <MaxWidthWrapper className={className}>{children}</MaxWidthWrapper>
    </ScrollArea>
  );
};

export default Container;
