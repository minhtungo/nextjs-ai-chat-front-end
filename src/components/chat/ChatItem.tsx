"use client";

import { chatUrl } from "@/config/config";

import EditChatTitle from "@/components/chat/EditChatTitle";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteChats } from "@/hooks/use-delete-chats";
import { useUpdateChatTitle } from "@/hooks/use-update-chat-title";
import { cn } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import ChatActions from "./ChatActions";

interface ChatItemProps {
  chatId: string;
  title: string;
}

const ChatItem = ({ chatId, title: initialTitle }: ChatItemProps) => {
  const { id: currentChatId } = useParams<{ id: string }>();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { title, isEditing, setTitle, setIsEditing, updateChatTitle } =
    useUpdateChatTitle(chatId, initialTitle);

  const { isPending: isRemoving, deleteChats } = useDeleteChats({
    chatId,
    currentChatId,
    setDialogOpen: setDeleteDialogOpen,
  });

  return (
    <li
      className={cn(
        "group relative w-full overflow-hidden rounded-lg hover:bg-muted",
        currentChatId === chatId && "bg-muted",
      )}
    >
      {isEditing ? (
        <div className="z-10 h-full w-full rounded-lg border-ring">
          <EditChatTitle
            title={title}
            setTitle={setTitle}
            onUpdateTitle={updateChatTitle}
          />
        </div>
      ) : (
        <>
          <Link
            href={`${chatUrl}/${chatId}`}
            className={cn(
              "flex w-full items-center p-2 text-sm font-normal capitalize text-foreground/80",
            )}
          >
            <div className="relative grow overflow-hidden whitespace-nowrap">
              {title}
              <div
                className={cn(
                  "absolute bottom-0 right-0 top-0 w-6 bg-gradient-to-l from-accent from-30% to-accent/60 group-hover:w-9 group-hover:from-muted group-hover:to-muted/60",
                  currentChatId === chatId && "w-9 from-muted to-muted/60",
                )}
              />
            </div>
          </Link>
          <div
            className={cn(
              "absolute bottom-0 right-0 top-0 flex items-center bg-muted pr-2 opacity-0 group-hover:opacity-100",
              currentChatId === chatId && "opacity-100",
            )}
          >
            <ChatActions>
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Pencil className="size-4" />
                <span>Rename</span>
                <span className="sr-only">Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isRemoving}
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash className="size-4" />
                <span>Delete</span>
                <span className="sr-only">Delete</span>
              </DropdownMenuItem>
            </ChatActions>
          </div>
          <DeleteChatAlert
            deleteDialogOpen={deleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            isRemovePending={isRemoving}
            onDeleteChat={deleteChats}
          />
        </>
      )}
    </li>
  );
};

export default ChatItem;
