import { getMessagesAction } from "@/actions/chat";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { useMessages } from "@/hooks/use-messages";
import { MESSAGES_LIMIT } from "@/lib/constant";
import { getMessagesQueryKey } from "@/lib/queryKey";
import { useEffect, useMemo } from "react";

export const useInfiniteMessages = ({
  chatId,
  inView,
}: {
  chatId: string;
  inView: boolean;
}) => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useServerActionInfiniteQuery(getMessagesAction, {
    initialPageParam: 0,
    queryKey: getMessagesQueryKey(chatId),
    getNextPageParam: (lastPage) =>
      lastPage.messages[0]?.timestamp || undefined,
    input: ({ pageParam }) => ({
      roomId: chatId,
      query: {
        ...(pageParam !== 0 && { offset: pageParam }),
      },
    }),
  });

  const { setMessages } = useMessages();

  const messageData = useMemo(
    () => data?.pages.toReversed().flatMap((page) => page.messages) || [],
    [data],
  );

  useEffect(() => {
    setMessages(() => {
      if (!messageData) return [];
      return messageData;
    });
  }, [messageData]);

  useEffect(() => {
    if (messageData.length > MESSAGES_LIMIT && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return {
    isLoading,
    messages: messageData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    data,
  };
};
