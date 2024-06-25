"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { ExtendedUser } from "@/types/next-auth";
import { useAIState, useUIState } from "ai/rsc";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import ButtonScrollToBottom from "../ButtonScrollToBottom";
import Container from "../dashboard/Container";
import ChatList from "./ChatList";
import ChatPanel from "./ChatPanel";
import { PROTECTED_BASE_URL } from "@/lib/constant";

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string;
  user?: ExtendedUser;
}

const Chat: FC<ChatProps> = ({ id, user }) => {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const [aiState] = useAIState();

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView(false);
    }
  }, [messages]);

  useEffect(() => {
    if (user) {
      if (!path.includes("chat") && messages.length === 1) {
        window.history.replaceState({}, "", `${PROTECTED_BASE_URL}/chat/${id}`);
      }
    }
  }, [id, path, user, messages]);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [aiState.messages, router]);

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
          {messages.length > 0 && <ChatList messages={messages} />}
        </div>
        <div className="h-px w-full" ref={visibilityRef} />
      </Container>
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <ChatPanel input={input} setInput={setInput} />
    </>
  );
};

export default Chat;
