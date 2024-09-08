"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";

const sidebarVariants = cva(
  "absolute inset-y-0 z-30 hidden h-screen overflow-visible bg-card transition duration-300 ease-in-out bg-card data-[state=open]:translate-x-0 lg:w-[300px]",
  {
    variants: {
      side: {
        default: "border-r translate-x-0",
        left: "border-r -translate-x-full",
        right: "border-l right-0 translate-x-full",
      },
    },
    defaultVariants: {
      side: "default",
    },
  },
);

export interface SidebarProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof sidebarVariants> {}

const Sidebar: FC<SidebarProps> = ({ className, side, children, ...props }) => {
  return (
    <div className={cn(sidebarVariants({ side }), className)} {...props}>
      {children}
    </div>
  );
};

export default Sidebar;
