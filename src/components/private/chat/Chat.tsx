"use client";

import { FC, useEffect } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import ChatPanel from "@/components/private/chat/ChatPanel";
import ChatSubscribing from "@/components/private/chat/ChatSubscribing";
import ChatWindow from "@/components/private/chat/window/ChatWindow";
import { useMessages } from "@/hooks/use-messages";
import { Message } from "@/lib/definitions";
import { User } from "next-auth";
import { useParams } from "next/navigation";

interface ChatProps extends React.ComponentProps<"div"> {
  userId: string;
  chatId: string;
  user?: User;
  initialMessages?: Message[];
}

const Chat: FC<ChatProps> = ({ user, userId, chatId, initialMessages }) => {
  const { id } = useParams<{ id: string }>();
  const { messages } = useMessages();

  useEffect(() => {
    if (user) {
      if (!id && messages.length === 1) {
        window.history.replaceState({}, "", `/chat/${chatId}`);
      }
    }
  }, [id, messages, user]);

  return (
    <>
      <ChatHistory
        chatId={chatId}
        userId={userId}
        initialMessages={initialMessages}
      />
      <ChatPanel chatId={chatId} userId={userId} />
      <ChatWindow chatId={chatId} userId={userId} />
      <ChatSubscribing />
    </>
  );
};

export default Chat;
