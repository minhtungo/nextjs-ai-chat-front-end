"use client";

import { Button } from "@/components/ui/button";
import { AppWindowMac } from "lucide-react";

import Hint from "@/components/common/Hint";
import { useChat } from "@/features/chat/store/use-chat";

const ChatViewToggle = () => {
  const { setSelectedImageIndex, selectedImageIndex, images } = useChat();

  if (images.length === 0 || selectedImageIndex !== null) return null;

  return (
    <Hint label="Toggle chat view">
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
    </Hint>
  );
};

export default ChatViewToggle;
