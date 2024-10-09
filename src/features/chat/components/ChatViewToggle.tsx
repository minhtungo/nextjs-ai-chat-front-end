"use client";

import { Button } from "@/components/ui/button";
import { AppWindowMac } from "lucide-react";

import TooltipContainer from "@/components/common/TooltipContainer";
import { useChat } from "@/features/chat/store/use-chat";

const ChatViewToggle = () => {
  const { setSelectedImageIndex, selectedImageIndex, images } = useChat();

  if (images.length === 0 || selectedImageIndex !== null) return null;

  return (
    <TooltipContainer content="Toggle chat view">
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
    </TooltipContainer>
  );
};

export default ChatViewToggle;
