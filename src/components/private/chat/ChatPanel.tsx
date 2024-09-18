"use client";

import { useEffect } from "react";

import { currentSubscriptionAtom } from "@/atoms/subscription";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import PromptForm from "@/components/private/chat/PromptForm";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import { Badge } from "@/components/ui/badge";
import { useCentrifuge } from "@/hooks/use-centrifuge";
import { useMessage } from "@/hooks/use-message";
import { useSendMessage } from "@/hooks/use-send-message";
import { isGuestUser } from "@/lib/utils";
import { useSetAtom } from "jotai";

interface ChatPanelProps {
  chatId?: string;
  userId: string;
}

const ChatPanel = ({ chatId, userId }: ChatPanelProps) => {
  const { centrifuge } = useCentrifuge();
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
    <MaxWidthWrapper className="max-w-5xl space-y-3 py-3">
      <PromptSuggestions userId={userId} />
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
