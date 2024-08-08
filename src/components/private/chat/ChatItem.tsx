"use client";

import { buttonVariants } from "@/components/ui/button";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ChatRoom } from "@/types/chat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import ChatActions from "./ChatActions";

interface ChatItemProps {
  chat: ChatRoom;
  setIsOpen: (value: boolean) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chat, setIsOpen }) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

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
          buttonVariants({ variant: "ghost", size: "sm" }),
          "flex items-center justify-start overflow-hidden px-4 py-2 text-muted-foreground",
          (isActive || isActiveChat) && "text-foreground",
        )}
      >
        <div className="relative w-full flex-1 overflow-hidden whitespace-nowrap capitalize">
          {chat.title}

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
        <ChatActions chat={chat} setIsActive={setIsActive} />
      </div>
    </li>
  );
};

export default ChatItem;
