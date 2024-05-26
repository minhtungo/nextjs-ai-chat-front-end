import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { FC } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface SheetWrapperProps {
  className?: string;
  title?: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
}

const SheetWrapper: FC<SheetWrapperProps> = ({
  className,
  children,
  title,
  side,
}) => {
  return (
    <Sheet>
      <SheetTrigger className={cn("sm:hidden", className)}>
        <Menu />
      </SheetTrigger>
      <SheetContent className="h-full w-full" side={side}>
        <div className="relative flex h-screen w-full flex-1 flex-col">
          <ScrollArea className="flex h-full w-full flex-1 flex-col py-4 lg:py-6">
            <SheetHeader>
              <SheetTitle>{title ? title : "Lumi"}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 h-full w-full flex-1 px-4 sm:px-6">
              {children}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetWrapper;
