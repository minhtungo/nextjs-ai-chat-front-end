"use client";

import { chatUrl } from "@/app-config";
import DeleteChatAlert from "@/components/private/chat/DeleteChatAlert";
import EditChatTitle from "@/components/private/chat/EditChatTitle";
import { buttonVariants } from "@/components/ui/button";
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

const ChatItem: FC<ChatItemProps> = ({ chatId, title: initialTitle }) => {
  const { id: currentChatId } = useParams<{ id: string }>();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { title, isEditing, setTitle, setIsEditing, updateChatTitle } =
    useUpdateChatTitle(chatId, initialTitle);

  const { isPending: isRemoving, deleteChats } = useDeleteChats(
    chatId,
    currentChatId,
    setDeleteDialogOpen,
  );

  return (
    <li
      className={cn(
        "group relative w-full overflow-hidden rounded-lg hover:bg-accent",
        currentChatId === chatId && "bg-accent",
      )}
    >
      {isEditing ? (
        <div className="border-1 z-10 h-full w-full rounded-lg border-ring bg-card">
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
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative flex w-full items-center justify-start overflow-hidden whitespace-nowrap p-2 text-sm font-normal capitalize text-foreground/80 hover:text-foreground/80",
            )}
          >
            {title}
            <div
              className={cn(
                "absolute bottom-0 right-0 top-0 w-2 bg-gradient-to-l from-background/80 from-60% to-transparent group-hover:w-9 group-hover:from-accent/90",
                currentChatId === chatId && "w-9 from-accent/90",
              )}
            />
          </Link>
          <div
            className={cn(
              "absolute bottom-0 right-0 top-0 flex items-center bg-accent pr-2 opacity-0 group-hover:opacity-100",
              currentChatId === chatId && "opacity-100",
            )}
          >
            <ChatActions>
              <DropdownMenuItem onClick={() => setIsEditing((prev) => !prev)}>
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
