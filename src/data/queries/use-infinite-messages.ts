import { getMessagesAction } from "@/actions/chat";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { useChat } from "@/hooks/use-chat";
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

  const { setChat } = useChat();

  const messageData = useMemo(
    () => data?.pages.toReversed().flatMap((page) => page.messages) || [],
    [data],
  );

  useEffect(() => {
    if (messageData) {
      setChat((prev) => ({
        ...prev,
        messages: messageData,
        docs: messageData.flatMap((msg) => msg.docs || []),
        images: messageData.flatMap((msg) => msg.images[0] || []),
      }));
    }
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
