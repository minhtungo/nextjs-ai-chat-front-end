import ChatItem from "@/components/private/chat/ChatItem";
import { cn, groupChatsByDate } from "@/lib/utils";
import { getChatListUseCase } from "@/use-cases/chat";
import React, { FC } from "react";

interface ChatListProps {
  className?: string;
}

const ChatList: FC<ChatListProps> = async ({ className }) => {
  const chats = await getChatListUseCase();

  if (!chats || chats.length === 0) {
    return (
      <div className="mt-2 text-sm text-muted-foreground">
        You have no chats yet.
      </div>
    );
  }

  const groupedChats = groupChatsByDate(chats);

  console.log("groupedChats", groupedChats[1].chats);

  return (
    <div className={cn("px-4", className)}>
      <ol className="space-y-4">
        {groupedChats.map(({ label, chats }) => (
          <React.Fragment key={`${label}-chat-group`}>
            {chats.length > 0 && (
              <li>
                <div className="mb-1.5 text-[13px] font-semibold">{label}</div>
                <ul className="space-y-1">
                  {chats.map((chat) => (
                    <ChatItem key={`${chat.id}-chat-item`} chat={chat} />
                  ))}
                </ul>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
};

export default ChatList;
