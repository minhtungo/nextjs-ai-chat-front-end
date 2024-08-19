"use client";

import { useMediaQuery } from "@/hooks/use-media.query";
import { cn } from "@/lib/utils";
import { FC } from "react";

export interface SidebarProps extends React.ComponentProps<"div"> {}

const Sidebar: FC<SidebarProps> = ({ className, children }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  console.log("isMobile", isMobile);
  if (isMobile) return null;

  return (
    <aside
      className={cn(
        "absolute inset-y-0 z-30 hidden h-full max-h-screen flex-col gap-y-3 border-r bg-card py-4 duration-300 ease-in-out lg:flex lg:w-[300px]",
        className,
      )}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
