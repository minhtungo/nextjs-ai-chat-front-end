"use client";

import { Button } from "@/components/ui/button";
import { chatStore } from "@/store/chat";
import { AppWindowMac } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatViewToggle = () => {
  const { messages, setChat } = chatStore();

  if (
    !messages ||
    !messages.some((message) => message.images && message.images?.length > 0)
  ) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="hidden gap-1 text-muted-foreground md:inline-flex"
            onClick={() => {
              setChat((prev) => ({
                ...prev,
                selectedImageIndex: 0,
              }));
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
