"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";

interface SidebarToggleProps {
  className?: string;
  side: "left" | "right" | null;
  type: "chat" | "attachments";
  isSidebarOpen: boolean;
}

const SidebarToggle: FC<SidebarToggleProps> = ({
  side,
  className,
  type,
  isSidebarOpen,
}) => {
  const { toggleAttachmentsSidebar, toggleChatSidebar } = useSidebar();

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "hidden rounded-full bg-accent p-1 lg:flex",
              className,
            )}
            onClick={() => {
              if (type === "chat") {
                toggleChatSidebar();
              } else {
                toggleAttachmentsSidebar();
              }
            }}
          >
            {isSidebarOpen ? (
              <>
                {side === "left" ? (
                  <ChevronLeft className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </>
            ) : (
              <>
                {side === "left" ? (
                  <ChevronRight className="size-4" />
                ) : (
                  <ChevronLeft className="size-4" />
                )}
              </>
            )}
            <span className="sr-only">Toggle {type} Sidebar</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle {type} sidebar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarToggle;
