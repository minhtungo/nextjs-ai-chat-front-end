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
  triggerClassName?: string;
  footerClassName?: string;
  title?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
}

const SheetWrapper: FC<SheetWrapperProps> = ({
  className,
  content,
  footer,
  footerClassName,
  title,
  triggerClassName,
  side,
}) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(triggerClassName)}>
        <Menu />
      </SheetTrigger>
      <SheetContent className="h-full w-full" side={side}>
        <div className="relative flex h-screen w-full flex-1 flex-col">
          <ScrollArea className="flex h-full w-full flex-1 flex-col py-4 lg:py-6">
            {title && (
              <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
              </SheetHeader>
            )}
            <div
              className={cn(
                "mt-8 h-full w-full flex-1 px-4 sm:px-6",
                className,
              )}
            >
              {content}
            </div>
          </ScrollArea>
          {footer ? <div className={cn(footerClassName)}>{footer}</div> : null}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetWrapper;
