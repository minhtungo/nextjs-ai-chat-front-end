import { updateChatAction } from "@/actions/chat";
import { useServerActionMutation } from "@/hooks/server-action-hooks";
import { getQueryClient } from "@/lib/get-query-client";
import { getChatInfoQueryKey } from "@/lib/queryKey";
import { toast } from "sonner";

const queryClient = getQueryClient();

export const useUpdateChat = () => {
  return useServerActionMutation(updateChatAction, {
    onError: (error) => {
      toast.error(error.message);
    },
    // onMutate: async (variables) => {
    //   await queryClient.cancelQueries({
    //     queryKey: getChatInfoQueryKey(variables.roomId),
    //   });

    //   const previous = queryClient.getQueryData(
    //     getChatInfoQueryKey(variables.roomId),
    //   );

    //   console.log("previous", previous);

    //   queryClient.setQueryData(
    //     getChatInfoQueryKey(variables.roomId),
    //     (old: any) => {
    //       console.log("old", {
    //         chat: {
    //           ...old.chat,
    //           ...variables,
    //         },
    //       });
    //       return {
    //         chat: {
    //           ...old.chat,
    //           ...variables,
    //         },
    //       };
    //     },
    //   );

    //   return { previous };
    // },
  });
};
