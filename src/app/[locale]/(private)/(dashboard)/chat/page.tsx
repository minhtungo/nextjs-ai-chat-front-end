import NewChatWelcome from "@/components/private/chat/NewChatWelcome";
import { getCurrentUser } from "@/lib/auth";

const ChatPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return <NewChatWelcome user={user} />;
};

export default ChatPage;
