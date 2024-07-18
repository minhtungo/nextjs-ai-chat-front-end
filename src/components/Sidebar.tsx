"use client";

import { useSidebar } from "@/store/sidebar";
import { cn } from "@/lib/utils";
import { FC } from "react";

export interface SidebarProps extends React.ComponentProps<"div"> {}

const Sidebar: FC<SidebarProps> = ({ className, children }) => {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={cn(className, "h-full flex-col dark:bg-zinc-950")}
    >
      {children}
    </div>
  );
};

export default Sidebar;
