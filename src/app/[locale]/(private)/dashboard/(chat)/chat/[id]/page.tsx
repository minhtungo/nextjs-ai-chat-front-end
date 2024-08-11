import Chat from "@/components/private/chat/Chat";
import { getCurrentUser } from "@/lib/auth";

import { getChatInfoQueryKey, getMessagesQueryKey } from "@/lib/queryKey";
import { getChatInfoUseCase, getMessagesUseCase } from "@/use-cases/chat";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { FC } from "react";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage: FC<ChatPageProps> = async ({ params: { id } }) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: getChatInfoQueryKey(id),
    queryFn: () =>
      getChatInfoUseCase({
        chatId: id,
      }),
  });

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 0,
    queryKey: getMessagesQueryKey(id),
    queryFn: () =>
      getMessagesUseCase({
        roomId: id!,
        query: {},
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat userId={user.id!} chatId={id} />
    </HydrationBoundary>
  );
};

export default ChatPage;
