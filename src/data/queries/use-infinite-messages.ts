import { getMessagesAction } from "@/actions/chat";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { MESSAGES_LIMIT } from "@/lib/constant";
import { getMessagesQueryKey } from "@/lib/queryKey";
import { chatStore } from "@/store/chat";
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

  const { setChatImages, setChatDocs, setMessages } = chatStore();

  const messageData = useMemo(
    () => data?.pages.toReversed().flatMap((page) => page.messages) || [],
    [data],
  );

  useEffect(() => {
    if (messageData) {
      setMessages(messageData);
      setChatImages(messageData.flatMap((msg) => msg.images || []));
      setChatDocs(messageData.flatMap((msg) => msg.docs || []));
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
