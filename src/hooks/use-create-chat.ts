import { createChatAction } from "@/actions/chat";
import { useServerActionMutation } from "@/hooks/server-action-hooks";
import { toast } from "sonner";

export const useCreateChat = (toggleDialog?: (value: boolean) => void) => {
  return useServerActionMutation(createChatAction, {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (toggleDialog) {
        toggleDialog(false);
      }
    },
  });
};
