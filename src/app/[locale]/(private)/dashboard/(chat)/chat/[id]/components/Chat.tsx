"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import Container from "@/components/dashboard/Container";
import { User } from "next-auth";
import ChatPanel from "./ChatPanel";
import ChatList from "./ChatList";
import { Message } from "@/types/chat";
import { chatStore } from "@/store/chat";

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string;
  user?: User;
  initialMessages?: Message[];
}

const Chat: FC<ChatProps> = ({ id, user, initialMessages }) => {
  if (!user || !id) {
    return null;
  }
  const { getChat: messages } = chatStore();
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Container className="max-w-5xl">
        <div className="flex h-full w-full flex-1 flex-col gap-y-5">
          {messages.length > 0 && <ChatList messages={messages} />}
        </div>
      </Container>
      <div ref={scrollRef} />
      <ChatPanel user={user} chatId={id} />
    </>
  );
};

export default Chat;
