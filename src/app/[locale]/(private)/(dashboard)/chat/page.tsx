import { createChatAction } from "@/actions/chat";
import Chat from "@/components/private/chat/Chat";
import { getCurrentUser } from "@/lib/auth";

const ChatIndexPage = async () => {
  const [user, [chat]] = await Promise.all([
    getCurrentUser(),
    createChatAction(),
  ]);

  return (
    <Chat user={user} userId={user?.id ?? chat?.uid!} chatId={chat?.id!} />
  );
};

export default ChatIndexPage;
