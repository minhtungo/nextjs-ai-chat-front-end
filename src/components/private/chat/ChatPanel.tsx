"use client";

import { FC, FormEvent, useEffect } from "react";
import PromptForm from "./PromptForm";

import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import { chatInitialState, chatStore } from "@/store/chat";
import { useMessageStore } from "@/store/message";
import { useSendMessage } from "@/hooks/use-send-message";
import { useSubscription } from "@/store/centrifuge";

interface ChatPanelProps {
  userId: string;
  chatId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ userId, chatId }) => {
  const sub = useSubscription(`rooms:${chatId}`);
  const { messages, setChat } = chatStore();
  const { clearMessageStore } = useMessageStore();
  const { sendMessage } = useSendMessage({ userId, sub, chatId });

  useEffect(() => {
    return () => {
      console.log("clearmessagestore");
      clearMessageStore();
      setChat(chatInitialState);
    };
  }, [chatId]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({});
  };

  return (
    <MaxWidthWrapper className="space-y-3 pt-3">
      {messages && messages.length > 4 && (
        <PromptSuggestions className="mt-4" sub={sub} userId={userId} />
      )}
      <PromptForm onSubmit={onSubmit} />
    </MaxWidthWrapper>
  );
};

export default ChatPanel;
