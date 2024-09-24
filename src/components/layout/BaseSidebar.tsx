"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const sidebarVariants = cva(
  "absolute inset-y-0 z-30 hidden h-screen  bg-card transition-all duration-300 ease-in-out bg-card bg-accent lg:flex flex-col gap-y-3",
  {
    variants: {
      side: {
        default: "w-[300px]",
        left: "data-[state=open]:w-[300px] data-[state=closed]:w-[70px]",
        right: "right-0 translate-x-full data-[state=open]:translate-x-0",
      },
    },
  },
);

export interface SidebarProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof sidebarVariants> {}

const BaseSidebar = ({ className, side, children, ...props }: SidebarProps) => {
  return (
    <div className={cn(sidebarVariants({ side }), className)} {...props}>
      {children}
    </div>
  );
};

export default BaseSidebar;
