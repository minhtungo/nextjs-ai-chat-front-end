"use client";

import { removeChatAction } from "@/actions/chat";
import Spinner from "@/components/common/Spinner";
import DeleteChatAlert from "@/components/private/chat/DeleteChatAlert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { chatStore } from "@/store/chat";
import { Chat } from "@/types/chat";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

interface ChatActionsProps {
  chat: Chat;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}

const ChatActions: FC<ChatActionsProps> = ({ chat, setIsActive, isActive }) => {
  const {
    getChat: { isEditingTitle },
    setChat,
  } = chatStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { isPending: isRemovePending, execute } =
    useServerAction(removeChatAction);

  const onDeleteChat = async (e: any) => {
    e.preventDefault();
    const [_, error] = await execute({
      chatId: chat.id!,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <>
      <DropdownMenu modal={false} onOpenChange={setIsActive}>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger>
                <Ellipsis className="size-4" />
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Delete chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent>
          <DropdownMenuItem
            disabled={isRemovePending}
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash className="size-4" />
            <span>Delete</span>
            <span className="sr-only">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setChat((prev) => ({ ...prev, isEditingTitle: !isEditingTitle }))
            }
          >
            <Pencil className="size-4" />
            <span>Rename</span>
            <span className="sr-only">Rename</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteChatAlert
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        isRemovePending={isRemovePending}
        onDeleteChat={onDeleteChat}
      />
    </>
  );
};

export default ChatActions;
