"use client";

import PromptForm from "@/features/chat/components/PromptForm";
import { useSendMessage } from "@/hooks/use-send-message";

const PromptFormContainer = () => {
  const { sendMessage } = useSendMessage();

  return <PromptForm onSubmit={sendMessage} />;
};

export default PromptFormContainer;
