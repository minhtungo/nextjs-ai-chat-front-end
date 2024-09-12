import { removeChatsAction } from "@/actions/chat";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

export const useDeleteChats = (
  chatId: string,
  currentChatId: string,
  setDialogOpen?: (open: boolean) => void,
) => {
  const { execute, isPending } = useServerAction(removeChatsAction, {
    onError: ({ err }) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Chats deleted successfully");
      if (setDialogOpen) {
        setDialogOpen(false);
      }
    },
  });

  const deleteChats = async (e: any) => {
    e.preventDefault();

    await execute({
      chats: [chatId!],
      currentChatId,
    });
  };

  return { isPending, deleteChats };
};
