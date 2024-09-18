"use client";

import Sidebar from "@/components/private/common/Sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { FC } from "react";

interface SidebarWithToggleProps {
  className?: string;
  side: "left" | "right";
  children: React.ReactNode;
}

const SidebarWithToggle = ({
  className,
  side,
  children,
}: SidebarWithToggleProps) => {
  const { isSidebarOpen } = useSidebar(side);

  return (
    <Sidebar
      data-state={isSidebarOpen ? "open" : "closed"}
      className={className}
      side={side}
    >
      {children}
    </Sidebar>
  );
};

export default SidebarWithToggle;
