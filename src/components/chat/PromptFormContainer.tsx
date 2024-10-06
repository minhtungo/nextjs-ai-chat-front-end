"use client";

import PromptForm from "@/components/chat/PromptForm";
import { useSendMessage } from "@/hooks/use-send-message";

const PromptFormContainer = () => {
  const { sendMessage } = useSendMessage();

  return <PromptForm onSubmit={sendMessage} />;
};

export default PromptFormContainer;
