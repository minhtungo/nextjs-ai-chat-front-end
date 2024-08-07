"use client";

import { FC } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import { chatStore } from "@/store/chat";
import { Chat as ChatRoom } from "@/types/chat";
import { User } from "next-auth";
import ChatOverlayView from "./ChatOverlayView";
import ChatPanel from "./ChatPanel";

export interface ChatProps extends React.ComponentProps<"div"> {
  user: User;
  chat: ChatRoom;
}

const Chat: FC<ChatProps> = ({ user, chat }) => {
  const {
    getChat: {
      overlay: { isOpen: isOverlayOpen },
    },
  } = chatStore();

  return (
    <>
      <ChatHistory chat={chat} />
      <ChatPanel user={user} chatId={chat.id} />
      {isOverlayOpen && <ChatOverlayView user={user} />}
    </>
  );
};

export default Chat;
