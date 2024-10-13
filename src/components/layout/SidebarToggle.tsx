"use client";

import Hint from "@/components/common/Hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { PanelLeft, PanelRight } from "lucide-react";

interface SidebarToggleProps extends React.ComponentProps<"div"> {
  side: "left" | "right";
  type?: "out" | "in";
}

const SidebarToggle = ({
  side,
  className,
  type = "in",
}: SidebarToggleProps) => {
  const { isSidebarOpen, setSidebarOpen } = useSidebar(side);

  if (type === "out" && isSidebarOpen) {
    return null;
  }

  return (
    <Hint label={`Toggle ${side === "left" ? "chat" : "attachments"} sidebar`}>
      <Button
        className={cn("hidden lg:flex", className)}
        variant="ghost"
        size="icon"
        onClick={() => {
          setSidebarOpen(!isSidebarOpen);
        }}
      >
        {side === "left" ? (
          <PanelLeft className="size-5 text-muted-foreground sm:size-6" />
        ) : (
          <PanelRight className="size-5 text-muted-foreground sm:size-6" />
        )}
        <span className="sr-only">
          Toggle {side === "left" ? "chat" : "attachments"} sidebar
        </span>
      </Button>
    </Hint>
  );
};

export default SidebarToggle;
