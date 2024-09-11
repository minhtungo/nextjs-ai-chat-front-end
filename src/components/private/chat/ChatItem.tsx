"use client";

import { updateChatAction } from "@/actions/chat";
import { chatUrl } from "@/app-config";
import EditChatTitle from "@/components/private/chat/EditChatTitle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatListItem } from "@/types/chat";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import ChatActions from "./ChatActions";

interface ChatItemProps {
  chat: ChatListItem;
}

const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const router = useRouter();
  const { id: currentChatId } = useParams<{ id: string }>();

  const [title, setTitle] = useState(chat.title);
  const [isEditing, setIsEditing] = useState(false);

  const { execute: updateChat } = useServerAction(updateChatAction, {
    onError: ({ err }) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const onUpdateTitle = async () => {
    if (title === chat.title) {
      setIsEditing(false);
      return;
    }

    updateChat({
      chatId: chat.id!,
      title,
    });

    setIsEditing(false);
  };

  return (
    <li
      className={cn(
        "group relative w-full overflow-hidden rounded-lg hover:bg-accent",
        currentChatId === chat.id && "bg-accent",
      )}
    >
      {isEditing ? (
        <div className="border-1 z-10 h-full w-full rounded-lg border-ring bg-card">
          <EditChatTitle
            title={title}
            setTitle={setTitle}
            onUpdateTitle={onUpdateTitle}
          />
        </div>
      ) : (
        <>
          <Link
            href={`${chatUrl}/${chat.id}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative flex w-full items-center justify-start overflow-hidden whitespace-nowrap p-2 text-sm font-normal capitalize text-foreground/80 hover:text-foreground/80",
            )}
          >
            {title}
            <div
              className={cn(
                "absolute bottom-0 right-0 top-0 w-2 bg-gradient-to-l from-background/80 from-60% to-transparent group-hover:w-9 group-hover:from-accent/90",
                currentChatId === chat.id && "w-9 from-accent/90",
              )}
            />
          </Link>
          <div
            className={cn(
              "absolute bottom-0 right-0 top-0 flex items-center bg-accent pr-2 opacity-0 group-hover:opacity-100",
              currentChatId === chat.id && "opacity-100",
            )}
          >
            <ChatActions
              chat={chat}
              currentChatId={currentChatId}
              onUpdateTitle={() => setIsEditing(true)}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default ChatItem;
