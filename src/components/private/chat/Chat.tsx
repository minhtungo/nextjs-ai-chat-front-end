"use client";

import { FC } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";

import ChatPanel from "./ChatPanel";
import { chatStore } from "@/store/chat";
import dynamic from "next/dynamic";
import Spinner from "@/components/common/Spinner";

const ChatOverlayView = dynamic(
  () => import("@/components/private/chat/ChatOverlayView"),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 bg-accent transition">
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="size-5" />
        </div>
      </div>
    ),
  },
);

interface ChatProps extends React.ComponentProps<"div"> {
  userId: string;
  chatId: string;
}

const Chat: FC<ChatProps> = ({ userId, chatId }) => {
  const {
    chat: { selectedImageIndex },
  } = chatStore();

  return (
    <>
      <ChatHistory chatId={chatId} userId={userId} />
      <ChatPanel userId={userId} chatId={chatId} />
      {selectedImageIndex !== null && (
        <ChatOverlayView chatId={chatId} userId={userId} />
      )}
    </>
  );
};

export default Chat;
