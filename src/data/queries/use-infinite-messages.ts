import { getMessagesAction } from "@/actions/chat";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { usePreviews } from "@/hooks/use-previews";
import { getMessagesQueryKey } from "@/lib/query-keys";

export const useInfiniteMessages = (chatId: string) => {
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

  console.log("data", data);

  const messages = usePreviews({ pages: data?.pages });

  return {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    data,
    messages,
  };
};

// const loadedPagesRef = useRef(new Set<number>());

// const { setMessages } = useMessages();

// const messageData = useMemo(() => {
//   if (!data) return [];
//   const messages = data.pages.flatMap((page) => page.messages).toReversed();
//   return messages;
// }, [data]);

// useEffect(() => {
//   if (data) {
//     const currentPageIndex = data.pages.length;
//     if (!loadedPagesRef.current.has(currentPageIndex)) {
//       loadedPagesRef.current.add(currentPageIndex);
//       setMessages((prevMessages) => [...messageData, ...prevMessages]);
//     }
//   }
// }, [data, messageData]);
