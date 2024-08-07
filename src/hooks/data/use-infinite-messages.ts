import { loadMessagesAction } from "@/actions/chat";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { useEffect, useMemo } from "react";
import { chatStore } from "@/store/chat";
import { Chat } from "@/types/chat";

const useInfiniteMessages = ({
  chat,
  inView,
}: {
  chat: Chat;
  inView: boolean;
}) => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useServerActionInfiniteQuery(loadMessagesAction, {
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

  const messages = messageData.toReversed();

  const { setChat } = chatStore();

  useEffect(() => {
    if (isLoading) return;

    setChat((prev) => ({
      ...prev,
      id: chat.id,
      subject: chat.subject,
      ...(chat.title && { title: chat.title }),
      messages,
    }));
  }, [isLoading, messageData]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return {
    isLoading,
    messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useInfiniteMessages;
