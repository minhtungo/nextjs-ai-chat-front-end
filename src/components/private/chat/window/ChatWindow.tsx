"use client";

import OverlayWindow from "@/components/common/OverlayWindow";
import Spinner from "@/components/common/Spinner";
import ChatHistory from "@/components/private/chat/ChatHistory";
import { chatStore } from "@/store/chat";
import dynamic from "next/dynamic";
import { FC } from "react";

interface ChatWindowProps {
  chatId: string;
  userId: string;
}

const ChatWindowArea = dynamic(
  () => import("@/components/private/chat/window/ChatWindowArea"),
  {
    loading: () => (
      <OverlayWindow className="flex h-full w-full items-center justify-center">
        <Spinner className="size-5" />
      </OverlayWindow>
    ),
  },
);

const ChatWindow: FC<ChatWindowProps> = ({ chatId, userId }) => {
  const {
    chat: { selectedImageIndex },
  } = chatStore();

  return (
    <>
      {selectedImageIndex !== null && (
        <ChatWindowArea chatId={chatId} userId={userId}>
          <ChatHistory
            chatId={chatId}
            userId={userId}
            messageClassName="py-4"
          />
        </ChatWindowArea>
      )}
    </>
  );
};

export default ChatWindow;
