"use client";

import { FC, useEffect } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import ChatPanel from "@/components/private/chat/ChatPanel";
import ChatWindow from "@/components/private/chat/window/ChatWindow";
import { useMessages } from "@/hooks/use-messages";
import { Message } from "@/lib/definitions";
import { isGuestUser } from "@/lib/utils";
import { useParams } from "next/navigation";

interface ChatProps extends React.ComponentProps<"div"> {
  userId: string;
  chatId?: string;
  initialMessages?: Message[];
}

const Chat: FC<ChatProps> = ({ userId, chatId, initialMessages }) => {
  const { id } = useParams<{ id: string }>();
  const { messages } = useMessages();

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
      <ChatWindow chatId={chatId} userId={userId} />
      {/* <ChatSubscribing /> */}
    </>
  );
};

export default Chat;
