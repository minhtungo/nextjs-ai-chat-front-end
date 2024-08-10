"use client";

import DeleteChatAlert from "@/components/private/chat/DeleteChatAlert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRemoveChats } from "@/data/mutations/use-remove-chats";
import { ChatRoom } from "@/types/chat";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { FC, useState } from "react";

interface ChatActionsProps {
  chat: ChatRoom;
  setIsActive: (value: boolean) => void;
  toggleUpdateTitle: () => void;
}

const ChatActions: FC<ChatActionsProps> = ({
  chat,
  setIsActive,
  toggleUpdateTitle,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutateAsync: removeChats, isPending: isRemoving } = useRemoveChats();

  const onDeleteChat = async (e: any) => {
    e.preventDefault();

    await removeChats({
      chats: [chat.id!],
    });

    setDeleteDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu modal={false} onOpenChange={setIsActive}>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger className="bg-accent">
                <Ellipsis className="size-4" />
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Options</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={toggleUpdateTitle}>
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
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteChatAlert
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        isRemovePending={isRemoving}
        onDeleteChat={onDeleteChat}
      />
    </>
  );
};

export default ChatActions;
