"use client";

import { updateChatAction } from "@/actions/chat";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { chatStore } from "@/store/chat";
import { ChatRoom } from "@/types/chat";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState, useTransition } from "react";
import ChatActions from "./ChatActions";

interface ChatItemProps {
  chat: ChatRoom;
  setIsOpen: (value: boolean) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chat, setIsOpen }) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { setChat } = chatStore();

  const isActiveChat = pathname === `${PROTECTED_BASE_URL}/chat/${chat.id}`;

  useEffect(() => {
    if (isActiveChat) {
      setIsOpen(true);
    }
  }, [isActiveChat]);

  const toggleUpdateTitle = () => {
    inputRef.current?.focus();
    setNewTitle(chat.title);
  };

  const onTitleChange = async (e: any) => {
    e.preventDefault();

    startTransition(async () => {
      const [_, error] = await updateChatAction({
        roomId: chat.id!,
        title: newTitle,
      });
      router.refresh();
    });

    setChat((prev) => ({
      ...prev,
      title: newTitle,
    }));
    setNewTitle("");
  };

  return (
    <li
      className={cn(
        "group relative w-full overflow-hidden rounded-lg hover:bg-accent",
        (isActiveChat || isActive) && "bg-accent",
      )}
    >
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
            "absolute bottom-0 right-0 top-0 hidden items-center pr-2 group-hover:flex",
            (isActiveChat || isActive) && "flex",
          )}
        >
          <ChatActions
            chat={chat}
            setIsActive={setIsActive}
            toggleUpdateTitle={toggleUpdateTitle}
          />
        </div>
      </>
      {newTitle && (
        <div className="absolute inset-0 z-10 h-full w-full">
          <Input
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
            className="h-full w-full"
          />
        </div>
      )}
    </li>
  );
};

export default ChatItem;
