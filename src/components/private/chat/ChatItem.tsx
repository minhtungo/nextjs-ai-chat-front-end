"use client";

import Spinner from "@/components/common/Spinner";
import { buttonVariants } from "@/components/ui/button";
import { useUpdateChat } from "@/data/mutations/use-update-chat";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ChatRoom } from "@/types/chat";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import ChatActions from "./ChatActions";

interface ChatItemProps {
  chat: ChatRoom;
  currentChatId: string;
}

const ChatItem: FC<ChatItemProps> = ({ chat, currentChatId }) => {
  const [isActive, setIsActive] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateChat, isPending } = useUpdateChat();

  const isActiveChat = currentChatId === chat.id;

  const toggleUpdateTitle = () => {
    inputRef.current?.focus();
    setNewTitle(chat.title);
  };

  const onTitleChange = async (e: any) => {
    e.preventDefault();

    if (newTitle === chat.title) {
      setNewTitle("");
      return;
    }

    updateChat({
      roomId: chat.id!,
      title: newTitle,
    });

    setNewTitle("");
  };

  return (
    <li
      className={cn(
        "group relative w-full overflow-hidden rounded-lg hover:bg-accent",
        (isActiveChat || isActive) && "bg-accent",
      )}
    >
      {newTitle ? (
        <div className="border-1 z-10 h-full w-full rounded-lg border-ring bg-card">
          <div className="flex items-center gap-x-2">
            <input
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              onBlur={onTitleChange}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onTitleChange(e);
                }
              }}
              className="flex h-9 w-full flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
            />
          </div>
        </div>
      ) : (
        <>
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
              "absolute bottom-0 right-0 top-0 hidden items-center bg-accent pr-2 group-hover:flex",
              (isActiveChat || isActive) && "flex",
            )}
          >
            {isPending ? (
              <Spinner className="size-3" />
            ) : (
              <ChatActions
                chat={chat}
                setIsActive={setIsActive}
                currentChatId={currentChatId}
                toggleUpdateTitle={toggleUpdateTitle}
              />
            )}
          </div>
        </>
      )}
    </li>
  );
};

export default ChatItem;
