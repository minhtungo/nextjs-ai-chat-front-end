"use client";

import Sidebar from "@/components/private/common/Sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { FC } from "react";

interface SidebarWithToggleProps {
  className?: string;
  side: "left" | "right" | null;
  children: React.ReactNode;
}

const SidebarWithToggle: FC<SidebarWithToggleProps> = ({
  className,
  side = "left",
  children,
}) => {
  const { isChatSidebarOpen, isAttachmentsSidebarOpen, isLoading } =
    useSidebar();

  const isSidebarOpen =
    side === "left" ? isChatSidebarOpen : isAttachmentsSidebarOpen;

  return (
    <Sidebar
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={className}
      side={side}
    >
      {children}
    </Sidebar>
  );
};

export default SidebarWithToggle;
