"use client";

import { FC } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import ChatOverlayView from "@/components/private/chat/ChatOverlayView";
import ChatPanel from "./ChatPanel";
import { chatStore } from "@/store/chat";

interface ChatProps extends React.ComponentProps<"div"> {
  userId: string;
  chatId: string;
}

const Chat: FC<ChatProps> = ({ userId, chatId }) => {
  const {
    chat: { selectedImageIndex },
  } = chatStore();

  return (
    <>
      <ChatHistory chatId={chatId} userId={userId} />
      <ChatPanel userId={userId} chatId={chatId} />
      {selectedImageIndex !== null && (
        <ChatOverlayView chatId={chatId} userId={userId} />
      )}
    </>
  );
};

export default Chat;
