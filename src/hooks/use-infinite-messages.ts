import { useChatInfo } from "@/hooks/use-chat-info";
import { getChatMessages } from "@/lib/chat";
import { Message } from "@/lib/definitions";
import { getMessagesQueryKey } from "@/lib/query-keys";
import { isGuestUser } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteMessages = ({
  initialMessages = [],
}: {
  initialMessages?: Message[];
}) => {
  const { chatId, chatUserId: userId } = useChatInfo();

  return useInfiniteQuery({
    queryKey: getMessagesQueryKey(chatId || ""),
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => getChatMessages(chatId!, pageParam),
    getNextPageParam: (lastPage) =>
      (lastPage?.messages?.length! > 0 && lastPage?.messages[0]?.timestamp) ||
      undefined,
    ...(initialMessages?.length > 0 && {
      initialData: {
        pages: [
          {
            messages: initialMessages,
          },
        ],
        pageParams: [0],
      },
    }),
    enabled: !isGuestUser(userId) && !!chatId,
  });
};
