"use client";

import OverlayWindow from "@/components/common/OverlayWindow";
import "@/styles/draw.css";
import { FC, useEffect, useState } from "react";

import ChatWindowPanel from "@/components/private/chat-window/ChatWindowPanel";
import ChatHistory from "@/components/private/chat/ChatHistory";

interface ChatWindowWrapperProps {
  userId: string;
  chatId?: string;
  children: React.ReactNode;
  onSubmitMessage: () => void;
}

const ChatWindowWrapper: FC<ChatWindowWrapperProps> = ({
  userId,
  chatId,
  children,
  onSubmitMessage,
}) => {
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
