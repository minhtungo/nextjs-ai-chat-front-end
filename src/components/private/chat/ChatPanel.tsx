"use client";

import { FC, FormEvent, useCallback, useEffect } from "react";
import PromptForm from "./PromptForm";

import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import { chatInitialState, chatStore } from "@/store/chat";
import { useMessageStore } from "@/store/message";
import { useSendMessage } from "@/hooks/use-send-message";
import { useSubscription } from "@/store/centrifuge";
import { Badge } from "@/components/ui/badge";

interface ChatPanelProps {
  userId: string;
  chatId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ userId, chatId }) => {
  const sub = useSubscription(`rooms:${chatId}`);
  const { messages, setChat } = chatStore();
  const { clearMessageStore } = useMessageStore();
  const { sendMessage, isMessageWithinTokenLimit } = useSendMessage({
    userId,
    sub,
    chatId,
  });

  useEffect(() => {
    return () => {
      clearMessageStore();
      setChat(chatInitialState);
    };
  }, [chatId]);

  const onSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({});
  };

  return (
    <MaxWidthWrapper className="space-y-3 pt-3">
      {messages && messages.length > 4 && (
        <PromptSuggestions className="mt-4" sub={sub} userId={userId} />
      )}
      <>
        {!isMessageWithinTokenLimit && (
          <Badge className="mb-3">
            <span className="text-xs">Exceeded token limit</span>
          </Badge>
        )}
        <PromptForm onSubmit={onSubmitMessage} />
      </>
    </MaxWidthWrapper>
  );
};

export default ChatPanel;
