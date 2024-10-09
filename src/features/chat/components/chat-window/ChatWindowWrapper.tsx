"use client";

import ChatWindowPanel from "@/features/chat/components/chat-window/ChatWindowPanel";
import ChatHistory from "@/features/chat/components/ChatHistory";
import OverlayWindow from "@/components/common/OverlayWindow";
import { useChat } from "@/features/chat/store/use-chat";
import "@/styles/draw.css";
import { useEffect, useState } from "react";

interface ChatWindowWrapperProps extends React.ComponentProps<"div"> {}

const ChatWindowWrapper = ({ children }: ChatWindowWrapperProps) => {
  const [open, setOpen] = useState(true);
  const { setSelectedImageIndex, setFocusedImage, setSelectedDocIndex } =
    useChat();

  useEffect(() => {
    const handleClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setSelectedImageIndex(null);
        setSelectedDocIndex(null);
        setFocusedImage(undefined);
      }
    };

    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, []);

  if (!open) return null;

  return (
    <OverlayWindow className="flex">
      <div className="flex-grow overflow-hidden">{children}</div>
      <div className="relative w-[450px] shrink-0 bg-background">
        <div className="relative flex h-screen flex-col">
          <ChatHistory />
          <ChatWindowPanel className="mb-3 px-4" />
        </div>
      </div>
    </OverlayWindow>
  );
};

export default ChatWindowWrapper;
