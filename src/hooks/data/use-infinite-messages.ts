import { getMessagesAction } from "@/actions/chat";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { chatStore } from "@/store/chat";
import { ChatRoom } from "@/types/chat";
import { useEffect, useMemo } from "react";

const useInfiniteMessages = ({
  chat,
  inView,
}: {
  chat: ChatRoom;
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
    queryKey: ["loadMessages", chat.id],
    getNextPageParam: (lastPage) => {
      return lastPage.messages[lastPage.messages.length - 1]?.timestamp !== 0
        ? lastPage.messages[lastPage.messages.length - 1]?.timestamp
        : undefined;
    },
    input: ({ pageParam }) => ({
      roomId: chat.id,
      query: {
        limit: 15,
        ...(pageParam !== 0 && { offset: pageParam }),
      },
    }),
  });

  const messageData = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.messages) : []),
    [data],
  );

  const { setChat } = chatStore();

  useEffect(() => {
    if (isLoading) return;

    setChat((prev) => ({
      ...prev,
      id: chat.id,
      subject: chat.subject,
      title: chat.title,
      messages: messageData.toReversed(),
    }));
  }, [isLoading, messageData]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return {
    isLoading,
    messages: messageData.toReversed(),
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
};

export default useInfiniteMessages;
