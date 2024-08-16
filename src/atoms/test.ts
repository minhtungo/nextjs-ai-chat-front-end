import { getMessagesAction } from "@/actions/chat";
import { getMessagesQueryKey } from "@/lib/queryKey";
import { atomWithInfiniteQuery } from "jotai-tanstack-query";

export const testAtom = atomWithInfiniteQuery(() => ({
  queryKey: getMessagesQueryKey("889351e7-0b61-400b-8677-a69bd40d7aff"),
  queryFn: async ({ pageParam }) =>
    getMessagesAction({
      roomId: "889351e7-0b61-400b-8677-a69bd40d7aff",
      query: {
        ...(pageParam !== 0 && { offset: pageParam }),
      },
    }),
  getNextPageParam: (lastPage) =>
    lastPage[0]?.messages[0]?.timestamp || undefined,
  initialPageParam: 0,
}));
