import { getCurrentUser } from "@/lib/auth";
import { ChatRoom } from "@/types/chat";
import { getChatsUseCase } from "@/use-cases/chat";
import ChatGroup from "./ChatGroup";

interface SubjectGroup {
  subject: string;
  chats: ChatRoom[];
}

const ChatListHistory = async () => {
  const user = await getCurrentUser();

  if (!user)
    return (
      <div className="mt-2 text-sm text-muted-foreground">No user found.</div>
    );

  const chats = await getChatsUseCase();

  if (!chats || chats.length === 0) {
    return (
      <div className="mt-2 text-sm text-muted-foreground">
        You have no chats yet.
      </div>
    );
  }

  const chatGroups: SubjectGroup[] = chats.reduce<SubjectGroup[]>(
    (acc, chat) => {
      const subjectGroup = acc.find((group) => group.subject === chat.subject);
      if (subjectGroup) {
        subjectGroup.chats.push(chat);
      } else {
        acc.push({
          subject: chat.subject!,
          chats: [chat],
        });
      }
      return acc;
    },
    [],
  );

  return (
    <div className="space-y-3">
      {chatGroups.map(({ subject, chats }) => {
        return (
          <ChatGroup
            key={`${subject}-chat-group`}
            subject={subject}
            chats={chats}
          />
        );
      })}
    </div>
  );
};

export default ChatListHistory;
