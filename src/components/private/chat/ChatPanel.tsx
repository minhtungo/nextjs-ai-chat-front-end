"use client";

import { FC, FormEvent, useEffect } from "react";
import PromptForm from "./PromptForm";

import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import { Badge } from "@/components/ui/badge";
import { useSendMessage } from "@/hooks/use-send-message";
import { useSubscription } from "@/store/centrifuge";
import { useMessageStore } from "@/store/message";

interface ChatPanelProps {
  userId: string;
  chatId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ userId, chatId }) => {
  const sub = useSubscription(`rooms:${chatId}`);
  const { clearMessageStore } = useMessageStore();
  const { sendMessage, isMessageWithinTokenLimit } = useSendMessage({
    userId,
    sub,
    chatId,
  });

  useEffect(() => {
    return () => {
      clearMessageStore();
    };
  }, [chatId]);

  const onSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({});
  };

  return (
    <MaxWidthWrapper className="space-y-3 pt-3">
      <PromptSuggestions className="mt-4" userId={userId} />
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
