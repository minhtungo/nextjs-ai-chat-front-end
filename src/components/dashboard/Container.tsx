import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <ScrollArea className="h-full flex-1">
      <div className="sm:px- mx-auto flex h-full w-full max-w-5xl flex-1 flex-col gap-y-5 overflow-hidden px-4 py-10">
        {children}
      </div>
    </ScrollArea>
  );
};

export default Container;
