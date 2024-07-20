"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

export interface SidebarProps extends React.ComponentProps<"div"> {}

const Sidebar: FC<SidebarProps> = ({ className, children }) => {
  return (
    <div data-state="open" className={cn(className, "h-full flex-col")}>
      {children}
    </div>
  );
};

export default Sidebar;
