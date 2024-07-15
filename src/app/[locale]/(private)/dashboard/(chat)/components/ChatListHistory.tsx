import { getChatsAction } from "@/actions/old/chat";
import { cache } from "react";
import { toast } from "sonner";
import ChatItem from "./ChatItem";

const loadChats = cache(async () => {
  const [data, error] = await getChatsAction();

  return {
    chats: data,
    error,
  };
});

const ChatListHistory = async () => {
  const { chats, error } = await loadChats();

  if (error) {
    toast.error(error.message);
    return null;
  }

  return (
    <>
      {chats && chats.length > 0 ? (
        <ol className="space-y-1.5">
          {chats.map((chat) => chat && <ChatItem chat={chat} />)}
        </ol>
      ) : (
        <div className="mt-2 text-sm text-muted-foreground">
          You have no chats yet.
        </div>
      )}
    </>
  );
};

export default ChatListHistory;
