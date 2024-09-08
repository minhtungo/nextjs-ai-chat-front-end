"use client";

import Sidebar from "@/components/private/common/Sidebar";
import SidebarToggle from "@/components/private/common/SidebarToggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface SidebarWithToggleProps {
  className?: string;
  side: "left" | "right" | null;
  type: "chat" | "attachments";
  children: React.ReactNode;
}

const SidebarWithToggle: FC<SidebarWithToggleProps> = ({
  className,
  type,
  side = "left",
  children,
}) => {
  const { isChatSidebarOpen, isAttachmentsSidebarOpen, isLoading } =
    useSidebar();

  const isSidebarOpen =
    type === "chat" ? isChatSidebarOpen : isAttachmentsSidebarOpen;

  return (
    <Sidebar
      data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      className={className}
      side={side}
    >
      {children}
      <SidebarToggle
        className={cn(
          "absolute top-1/2",
          side === "left" && (isSidebarOpen ? "-right-3" : "-right-8"),
          side === "right" && (isSidebarOpen ? "-left-3" : "-left-8"),
        )}
        type={type}
        side={side}
        isSidebarOpen={isSidebarOpen}
      />
    </Sidebar>
  );
};

export default SidebarWithToggle;
