"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { Message } from "@/types/chat";
import { ExtendedUser } from "@/types/next-auth";
import { useUIState } from "ai/rsc";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import ButtonScrollToBottom from "../ButtonScrollToBottom";
import ChatList from "./ChatList";
import ChatPanel from "./ChatPanel";
import Container from "./Container";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  user?: ExtendedUser;
}

const Chat: FC<ChatProps> = ({ id, className, user }) => {
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();

  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView(false);
    }
  }, [messages]);

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  useEffect(() => {
    if (user) {
      if (!path.includes("chat") && messages.length === 1) {
        // window.history.replaceState({}, "", `/chat/${id}`);
      }
    }
  }, [id, path, user, messages]);

  useEffect(() => {
    setNewChatId(id);
  }, [id]);

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <>
      <Container className="max-w-5xl">
        <div
          className="flex h-full w-full flex-1 flex-col gap-y-5"
          ref={chatBoxRef}
        >
          {messages.length > 0 && <ChatList messages={messages} user={user} />}
        </div>
        <div className="h-px w-full" ref={visibilityRef} />
        <ButtonScrollToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </Container>
      <ChatPanel input={input} setInput={setInput} />
    </>
  );
};

export default Chat;
