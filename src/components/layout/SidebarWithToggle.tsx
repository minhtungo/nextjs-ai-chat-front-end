"use client";

import BaseSidebar from "@/components/layout/BaseSidebar";
import { useSidebar } from "@/hooks/use-sidebar";

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
    <BaseSidebar
      data-state={isSidebarOpen ? "open" : "closed"}
      className={className}
      side={side}
    >
      {children}
    </BaseSidebar>
  );
};

export default SidebarWithToggle;
