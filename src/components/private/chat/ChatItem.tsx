"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { Chat } from "@/types/chat";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import ChatActions from "./ChatActions";
import { chatStore } from "@/store/chat";

interface ChatItemProps {
  chat: Chat;
  setIsOpen: (value: boolean) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chat, setIsOpen }) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const {
    getChat: { title, subject },
  } = chatStore();

  const isActiveChat = pathname === `${PROTECTED_BASE_URL}/chat/${chat.id}`;

  useEffect(() => {
    if (isActiveChat) {
      setIsOpen(true);
    }
  }, [isActiveChat]);

  return (
    <li
      className={cn(
        "group relative w-full overflow-hidden rounded-lg hover:bg-accent",
        (isActiveChat || isActive) && "bg-accent",
      )}
    >
      <Link
        href={`${PROTECTED_BASE_URL}/chat/${chat.id}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center justify-start overflow-hidden p-2 pl-3 text-muted-foreground",
          (isActive || isActiveChat) && "text-foreground",
        )}
      >
        <MessageCircle className="size-4" />
        <div className="relative w-full flex-1 overflow-hidden whitespace-nowrap capitalize">
          {chat.title ||
            chat.messages?.[0]?.content.substring(0, 20) ||
            chat.subject}

          <div
            className={cn(
              "absolute bottom-0 right-0 top-0 w-2 bg-gradient-to-l from-background/80 from-60% to-transparent group-hover:w-9 group-hover:from-accent/90",
              isActiveChat && "w-9 from-accent/90",
            )}
          />
        </div>
      </Link>
      <div
        className={cn(
          "absolute bottom-0 right-0 top-0 hidden items-center pr-2 group-hover:flex",
          (isActiveChat || isActive) && "flex",
        )}
      >
        <ChatActions
          chat={chat}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </div>
    </li>
  );
};

export default ChatItem;
