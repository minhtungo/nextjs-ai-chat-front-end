"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarToggleProps {
  className?: string;
}

const SidebarToggle: FC<SidebarToggleProps> = ({ className }) => {
  const { toggleSidebar, isSidebarOpen } = useSidebar();
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
              toggleSidebar();
            }}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle sidebar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarToggle;
