import { getChatListAction } from "@/actions/chat";
import { useServerActionQuery } from "@/hooks/server-action-hooks";
import { getChatListQueryKey } from "@/lib/queryKey";

export const useChatList = () => {
  return useServerActionQuery(getChatListAction, {
    queryKey: getChatListQueryKey(),
    input: undefined,
  });
};
