"use client";

import { useMediaQuery } from "@/hooks/use-media.query";
import { cn } from "@/lib/utils";
import { FC } from "react";

export interface SidebarProps extends React.ComponentProps<"div"> {}

const Sidebar: FC<SidebarProps> = ({ className, children }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) return null;

  return (
    <aside
      className={cn(
        "z-30 hidden h-screen flex-col gap-y-3 overflow-y-auto border-r bg-card duration-300 ease-in-out lg:flex lg:w-[300px]",
        className,
      )}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
