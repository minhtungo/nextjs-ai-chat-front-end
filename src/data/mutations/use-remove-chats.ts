import { removeChatsAction } from "@/actions/chat";
import { useServerActionMutation } from "@/hooks/server-action-hooks";
import { toast } from "sonner";

export const useRemoveChats = () => {
  return useServerActionMutation(removeChatsAction, {
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
