import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <ScrollArea className="h-full w-full flex-1 py-4 lg:py-6">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col gap-y-5 overflow-hidden px-4 lg:px-6">
        {children}
      </div>
    </ScrollArea>
  );
};

export default Container;
