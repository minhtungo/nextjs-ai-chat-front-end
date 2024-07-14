import { getChatsAction } from "@/actions/old/chat";
import { FC, Suspense, cache } from "react";
import ChatActions from "./ChatActions";
import ChatItem from "./ChatItem";

interface ChatListProps {}

const loadChats = cache(async () => {
  const [data, error] = await getChatsAction();

  return {
    chats: data,
    error,
  };
});

const ChatList: FC<ChatListProps> = async () => {
  const { chats, error } = await loadChats();

  if (error) return null;

  return (
    <>
      {chats && chats.length > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="h-full flex-1 space-y-1.5">
            {chats.map(
              (chat, index) =>
                chat && (
                  <ChatItem index={index} chat={chat}>
                    <ChatActions chat={chat} />
                  </ChatItem>
                ),
            )}
          </div>
        </Suspense>
      ) : (
        <div className="mt-2 text-sm text-muted-foreground">
          You have no chats yet.
        </div>
      )}
    </>
  );
};

export default ChatList;
