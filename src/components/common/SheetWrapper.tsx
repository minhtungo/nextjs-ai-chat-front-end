import Logo from "@/components/common/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

interface SheetWrapperProps extends React.ComponentProps<"div"> {
  triggerIcon?: React.ReactNode;
  triggerClassName?: string;
  wrapperClassName?: string;
  title?: string;
  footer?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
  noCloseTrigger?: boolean;
  action?: React.ReactNode;
}

const SheetWrapper = ({
  className,
  triggerClassName,
  triggerIcon,
  wrapperClassName,
  footer,
  title,
  side,
  noCloseTrigger,
  action,
  children,
}: SheetWrapperProps) => {
  return (
    <Sheet>
      <SheetTrigger className={cn("md:hidden", triggerClassName)}>
        {triggerIcon || (
          <Menu className="size-5 text-muted-foreground sm:size-6" />
        )}
      </SheetTrigger>
      <SheetContent
        className={cn("flex h-screen flex-col", wrapperClassName)}
        side={side}
        noCloseTrigger={noCloseTrigger}
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <SheetClose>
            <Link href="/">
              <Logo />
            </Link>
          </SheetClose>
          {action}
        </div>
        <ScrollArea className="flex h-full w-full flex-1 flex-col py-2">
          {title && (
            <SheetHeader className="px-4 sm:px-6">
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
          )}
          <div className={cn("px-4", className)}>{children}</div>
        </ScrollArea>
        {footer && <div className="px-4 py-4">{footer}</div>}
      </SheetContent>
    </Sheet>
  );
};

export default SheetWrapper;
