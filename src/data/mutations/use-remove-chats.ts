import { removeChatsAction } from "@/actions/chat";
import { useServerActionMutation } from "@/hooks/server-action-hooks";
import { toast } from "sonner";

export const useRemoveChats = (closeDialog?: (open: boolean) => void) => {
  return useServerActionMutation(removeChatsAction, {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Chats deleted successfully");
      if (closeDialog) {
        closeDialog(false);
      }
    },
  });
};
