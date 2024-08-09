"use client";

import { FC } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import { User } from "next-auth";
import ChatPanel from "./ChatPanel";
import { chatStore } from "@/store/chat";
import ChatOverlayView from "@/components/private/chat/ChatOverlayView";
import { ChatRoom } from "@/types/chat";

interface ChatProps extends React.ComponentProps<"div"> {
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
      <ChatHistory chat={chat} user={user} />
      <ChatPanel userId={user.id!} chatId={chat.id} />
      {isOverlayOpen && <ChatOverlayView chat={chat} user={user} />}
    </>
  );
};

export default Chat;
