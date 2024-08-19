import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import { Menu } from "lucide-react";

interface SheetWrapperProps {
  className?: string;
  trigger?: React.ReactNode;
  triggerClassName?: string;
  wrapperClassName?: string;
  footerClassName?: string;
  title?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
}

const SheetWrapper: FC<SheetWrapperProps> = ({
  className,
  triggerClassName,
  wrapperClassName,
  footerClassName,
  content,
  footer,
  title,
  side,
  trigger,
}) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(triggerClassName)}>
        {trigger || <Menu className="size-5 text-muted-foreground sm:size-6" />}
      </SheetTrigger>
      <SheetContent
        className={cn("h-full w-full", wrapperClassName)}
        side={side}
      >
        <Link href="/" className="absolute left-4 top-4">
          <Logo />
        </Link>
        <div className="relative flex h-screen w-full flex-1 flex-col">
          <ScrollArea className="flex h-full w-full flex-1 flex-col py-4 lg:py-6">
            {title && (
              <SheetHeader className="px-4 sm:px-6">
                <SheetTitle>{title}</SheetTitle>
              </SheetHeader>
            )}
            <div
              className={cn(
                "mt-14 h-full w-full flex-1 px-4 sm:px-6",
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
