"use client";

import { removeChatAction } from "@/actions/old/chat";
import Spinner from "@/components/common/Spinner";
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
import { Chat } from "@/types/chat";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { FC, MouseEventHandler, useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

interface ChatActionsProps {
  chat: Chat;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}

const ChatActions: FC<ChatActionsProps> = ({ chat, setIsActive, isActive }) => {
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
          <DropdownMenuItem>
            <Pencil className="size-4" />
            <span>Rename</span>
            <span className="sr-only">Rename</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteChatDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        isRemovePending={isRemovePending}
        onDeleteChat={onDeleteChat}
      />
    </>
  );
};

const DeleteChatDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  isRemovePending,
  onDeleteChat,
}: {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (value: boolean) => void;
  isRemovePending: boolean;
  onDeleteChat: (e: any) => Promise<void>;
}) => {
  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your chat message and remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemovePending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isRemovePending} onClick={onDeleteChat}>
            {isRemovePending && <Spinner />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChatActions;
