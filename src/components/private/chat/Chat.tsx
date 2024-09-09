"use client";

import { FC } from "react";

import DocPreviewWindowWrapper from "@/components/private/chat-window/DocPreviewWindowWrapper";
import ImagePreviewsWindowWrapper from "@/components/private/chat-window/ImagePreviewsWindowWrapper";
import ChatHistory from "@/components/private/chat/ChatHistory";
import ChatPanel from "@/components/private/chat/ChatPanel";
import { Message } from "@/lib/definitions";

interface ChatProps extends React.ComponentProps<"div"> {
  userId: string;
  chatId?: string;
  initialMessages?: Message[];
}

const Chat: FC<ChatProps> = ({ userId, chatId, initialMessages }) => {
  return (
    <>
      <ChatHistory
        chatId={chatId}
        userId={userId}
        initialMessages={initialMessages}
      />
      <ChatPanel chatId={chatId} userId={userId} />
      <ImagePreviewsWindowWrapper chatId={chatId} userId={userId} />
      <DocPreviewWindowWrapper userId={userId} chatId={chatId} />
    </>
  );
};

export default Chat;
