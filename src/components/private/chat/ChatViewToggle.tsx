"use client";

import { Button } from "@/components/ui/button";
import { AppWindowMac } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChat } from "@/hooks/use-chat";

const ChatViewToggle = () => {
  const { setSelectedImageIndex, images } = useChat();

  if (!images || images.length === 0) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="hidden gap-1 text-muted-foreground md:inline-flex"
            onClick={() => {
              setSelectedImageIndex(0);
            }}
          >
            <AppWindowMac className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle chat view</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatViewToggle;
