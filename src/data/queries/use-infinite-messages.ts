"use client";

import { getMessagesAction } from "@/actions/chat";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { Message } from "@/lib/definitions";
import { getMessagesQueryKey } from "@/lib/query-keys";
import { isGuestUser } from "@/lib/utils";

export const useInfiniteMessages = ({
  chatId,
  userId,
  initialMessages = [],
}: {
  chatId?: string;
  userId: string;
  initialMessages?: Message[];
}) => {
  return useServerActionInfiniteQuery(getMessagesAction, {
    queryKey: getMessagesQueryKey(chatId || ""),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      (lastPage?.messages?.length > 0 && lastPage?.messages[0]?.timestamp) ||
      undefined,
    input: ({ pageParam }) => ({
      chatId,
      query: {
        ...(pageParam !== 0 && { offset: pageParam }),
      },
    }),
    enabled: !isGuestUser(userId),
  });
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
