"use client";

import { chatStore } from "@/store/chat";
import { FC } from "react";

interface ChatTitleProps {}

const ChatTitle: FC<ChatTitleProps> = () => {
  const {
    getChat: { subject },
  } = chatStore();
  return (
    <h1 className="truncate text-lg font-bold">
      {subject.length > 0 ? subject : "Chat"}
    </h1>
  );
};

export default ChatTitle;
