"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { PanelLeft, PanelRight } from "lucide-react";

interface SidebarToggleProps {
  className?: string;
  side: "left" | "right";
  type?: "out" | "in";
}

const SidebarToggle = ({
  side,
  className,
  type = "in",
}: SidebarToggleProps) => {
  const {
    toggleAttachmentsSidebar,
    toggleChatSidebar,
    isAttachmentsSidebarOpen,
    isChatSidebarOpen,
  } = useSidebar();

  const isSidebarOpen =
    side === "left" ? isChatSidebarOpen : isAttachmentsSidebarOpen;

  if (type === "out" && isSidebarOpen) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("hidden lg:flex", className)}
          variant="ghost"
          size="icon"
          onClick={() => {
            if (side === "left") {
              toggleChatSidebar();
            } else {
              toggleAttachmentsSidebar();
            }
          }}
        >
          {side === "left" ? (
            <PanelLeft className="size-5 text-muted-foreground" />
          ) : (
            <PanelRight className="size-5 text-muted-foreground" />
          )}
          <span className="sr-only">
            Toggle {side === "left" ? "chat" : "attachments"} sidebar
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle {side === "left" ? "chat" : "attachments"} sidebar</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarToggle;
