"use client";

import { FC, FormEvent, useEffect } from "react";
import PromptForm from "./PromptForm";

import { subscribedCentrifugeAtom } from "@/atoms/centrifuge";
import { currentSubscriptionAtom } from "@/atoms/subscription";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import { Badge } from "@/components/ui/badge";
import { useMessage } from "@/hooks/use-message";
import { useSendMessage } from "@/hooks/use-send-message";
import { useAtom, useAtomValue } from "jotai";

interface ChatPanelProps {
  userId: string;
  chatId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ userId, chatId }) => {
  const centrifuge = useAtomValue(subscribedCentrifugeAtom);
  const [currentSubscription, setupSubscription] = useAtom(
    currentSubscriptionAtom,
  );

  const { resetMessageState, inTokenLimit } = useMessage();

  const { sendMessage } = useSendMessage({
    userId,
    sub: currentSubscription,
    chatId,
  });

  useEffect(() => {
    if (!centrifuge) return;
    setupSubscription(`rooms:${chatId}`);
    return () => {
      resetMessageState();
    };
  }, [chatId, centrifuge]);

  const onSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({});
  };

  return (
    <MaxWidthWrapper className="space-y-3 pt-3">
      <PromptSuggestions className="mt-4" userId={userId} chatId={chatId} />
      <>
        {!inTokenLimit && (
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
