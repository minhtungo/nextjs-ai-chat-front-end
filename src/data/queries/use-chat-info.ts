import { getChatInfoAction } from "@/actions/chat";
import { useServerActionQuery } from "@/hooks/server-action-hooks";
import { getChatInfoQueryKey } from "@/lib/query-keys";

export const useChatInfo = (chatId: string) => {
  return useServerActionQuery(getChatInfoAction, {
    queryKey: getChatInfoQueryKey(chatId),
    input: {
      chatId,
    },
    enabled: !!chatId,
  });
};
