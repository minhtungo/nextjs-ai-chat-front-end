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
  const { setSelectedImageIndex, selectedImageIndex, images } = useChat();

  console.log("test images", images);

  if (images.length === 0 || selectedImageIndex !== null) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="hidden gap-1 text-muted-foreground md:inline-flex"
            onClick={() => {
              setSelectedImageIndex(images.length - 1);
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
