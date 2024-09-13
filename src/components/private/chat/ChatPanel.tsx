"use client";

import { FC, useEffect } from "react";

import { subscribedCentrifugeAtom } from "@/atoms/centrifuge";
import { currentSubscriptionAtom } from "@/atoms/subscription";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptForm from "@/components/private/chat/PromptForm";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import { Badge } from "@/components/ui/badge";
import { useMessage } from "@/hooks/use-message";
import { useSendMessage } from "@/hooks/use-send-message";
import { isGuestUser } from "@/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";

interface ChatPanelProps {
  chatId?: string;
  userId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ chatId, userId }) => {
  const centrifuge = useAtomValue(subscribedCentrifugeAtom);
  const setupSubscription = useSetAtom(currentSubscriptionAtom);

  const { resetMessageState, inTokenLimit } = useMessage();

  const { sendMessage } = useSendMessage(userId, chatId);

  useEffect(() => {
    if (!centrifuge || !chatId || isGuestUser(userId)) return;

    setupSubscription(`rooms:${chatId}`);

    return () => {
      resetMessageState();
    };
  }, [chatId, centrifuge]);

  const onSubmitMessage = () => {
    sendMessage();
  };

  return (
    <MaxWidthWrapper className="max-w-5xl space-y-3 pb-4 pt-3">
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
