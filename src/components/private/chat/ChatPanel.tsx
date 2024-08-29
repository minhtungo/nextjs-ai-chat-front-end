"use client";

import { FC, FormEvent, useEffect } from "react";

import { subscribedCentrifugeAtom } from "@/atoms/centrifuge";
import { currentSubscriptionAtom } from "@/atoms/subscription";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptForm from "@/components/private/chat/PromptForm";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import { Badge } from "@/components/ui/badge";
import { useMessage } from "@/hooks/use-message";
import { useSendMessage } from "@/hooks/use-send-message";
import { useAtomValue, useSetAtom } from "jotai";

interface ChatPanelProps {
  chatId: string;
  userId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ chatId, userId }) => {
  const centrifuge = useAtomValue(subscribedCentrifugeAtom);
  const setupSubscription = useSetAtom(currentSubscriptionAtom);

  const { resetMessageState, inTokenLimit } = useMessage();

  const { sendMessage } = useSendMessage({
    userId,
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
      <PromptSuggestions className="mt-4" userId={userId} />
      {!inTokenLimit && (
        <Badge className="mb-3">
          <span className="text-xs">Exceeded token limit</span>
        </Badge>
      )}
      <PromptForm onSubmit={onSubmitMessage} />
    </MaxWidthWrapper>
  );
};

export default ChatPanel;
