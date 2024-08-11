import { getMessagesAction } from "@/actions/chat";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
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
    getNextPageParam: (lastPage) => {
      return lastPage.messages[lastPage.messages?.length - 1]?.timestamp !== 0
        ? lastPage.messages[lastPage.messages?.length - 1]?.timestamp
        : undefined;
    },
    input: ({ pageParam }) => ({
      roomId: chatId,
      query: {
        limit: 15,
        ...(pageParam !== 0 && { offset: pageParam }),
      },
    }),
  });

  const { setChatImages, setChatDocs, setMessages } = chatStore();

  const messageData = useMemo(
    () =>
      data ? data?.pages.flatMap((item) => item.messages).toReversed() : [],
    [data],
  );

  const chatImages = useMemo(
    () =>
      messageData
        .filter((message) => message.images?.length > 0)
        .flatMap((message) => message.images?.map((image) => image))
        .toReversed(),
    [messageData],
  );

  const chatDocs = useMemo(
    () =>
      messageData
        .filter((message) => message.docs?.length > 0)
        .flatMap((message) => message.docs?.map((doc) => doc))
        .toReversed(),
    [messageData],
  );

  useEffect(() => {
    setChatImages(chatImages);
  }, [chatImages]);

  useEffect(() => {
    setChatDocs(chatDocs);
  }, [chatDocs]);

  useEffect(() => {
    if (!messageData) return;
    setMessages(messageData);
  }, [messageData]);

  useEffect(() => {
    if (inView && hasNextPage) {
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
    chatImages,
    chatDocs,
  };
};
