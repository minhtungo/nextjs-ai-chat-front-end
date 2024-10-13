"use client";

import PromptForm from "@/features/chat/components/PromptForm";
import { useSendMessage } from "@/features/chat/store/use-send-message";

const PromptFormContainer = () => {
  const { sendMessage } = useSendMessage();

  return <PromptForm onSubmitMessage={(content) => sendMessage(content)} />;
};

export default PromptFormContainer;
