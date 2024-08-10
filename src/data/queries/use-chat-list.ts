import { getChatListAction } from "@/actions/chat";
import { useServerActionQuery } from "@/hooks/server-action-hooks";

export const useChatList = () => {
  return useServerActionQuery(getChatListAction, {
    queryKey: ["getChatList"],
    input: undefined,
  });
};
