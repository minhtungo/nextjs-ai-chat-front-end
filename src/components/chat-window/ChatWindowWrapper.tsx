"use client";

import ChatWindowPanel from "@/components/chat-window/ChatWindowPanel";
import ChatHistory from "@/components/chat/ChatHistory";
import OverlayWindow from "@/components/common/OverlayWindow";
import "@/styles/draw.css";
import { useEffect, useState } from "react";

interface ChatWindowWrapperProps extends React.ComponentProps<"div"> {
  userId: string;
  chatId?: string;
  onSubmitMessage: () => void;
}

const ChatWindowWrapper = ({
  userId,
  chatId,
  children,
  onSubmitMessage,
}: ChatWindowWrapperProps) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
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
          <ChatHistory chatId={chatId} userId={userId} />
          <div className="mb-3 px-4">
            <ChatWindowPanel onSubmitMessage={onSubmitMessage} />
          </div>
        </div>
      </div>
    </OverlayWindow>
  );
};

export default ChatWindowWrapper;
