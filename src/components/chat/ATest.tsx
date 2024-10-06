"use client";

import { useChatInfo } from "@/hooks/use-chat-info";

interface ATestProps {}

const ATest = ({}: ATestProps) => {
  console.log("ATest chatId");
  const { chatId } = useChatInfo();
  return <div>Test chatId: {chatId}</div>;
};

export default ATest;
