import { createChatAction } from "@/features/chat/actions";
import { useServerActionMutation } from "@/hooks/server-action-hooks";
import { toast } from "sonner";

export const useCreateChat = (toggleDialog?: (value: boolean) => void) => {
  return useServerActionMutation(createChatAction, {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      if (toggleDialog) {
        toggleDialog(false);
      }
    },
  });
};
