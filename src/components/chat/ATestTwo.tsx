"use client";

import { useChatInfo } from "@/hooks/use-chat-info";

interface ATestProps {}

const ATestTwo = ({}: ATestProps) => {
  const { chatUserId } = useChatInfo();
  console.log("ATest userId");
  return <div>Test UserId: {chatUserId}</div>;
};

export default ATestTwo;
