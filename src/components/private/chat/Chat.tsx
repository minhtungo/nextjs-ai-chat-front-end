"use client";

import { FC, useEffect } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import ChatPanel from "@/components/private/chat/ChatPanel";
import { useMessages } from "@/hooks/use-messages";
import { Message } from "@/lib/definitions";
import { isGuestUser } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useChat } from "@/hooks/use-chat";
import ImagePreviewsWindowWrapper from "@/components/private/chat-window/ImagePreviewsWindowWrapper";

interface ChatProps extends React.ComponentProps<"div"> {
  userId: string;
  chatId?: string;
  initialMessages?: Message[];
}

const Chat: FC<ChatProps> = ({ userId, chatId, initialMessages }) => {
  const { id } = useParams<{ id: string }>();
  const { messages } = useMessages();
  const { docs } = useChat();

  console.log("docs", docs);

  useEffect(() => {
    if (!isGuestUser(userId)) {
      if (chatId && !id && messages.length === 1) {
        window.history.replaceState({}, "", `/chat/${chatId}`);
      }
    }
  }, [id, messages, userId]);

  return (
    <>
      <ChatHistory
        chatId={chatId}
        userId={userId}
        initialMessages={initialMessages}
      />
      <ChatPanel chatId={chatId} userId={userId} />
      <ImagePreviewsWindowWrapper chatId={chatId} userId={userId} />
      {/* <ChatSubscribing /> */}
    </>
  );
};

export default Chat;
