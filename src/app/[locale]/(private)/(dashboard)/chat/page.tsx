import Chat from "@/components/private/chat/Chat";
import { getChatUserIdUseCase } from "@/use-cases/session";

const ChatIndexPage = async () => {
  const userId = await getChatUserIdUseCase();

  if (!userId) {
    throw new Error("Something went wrong! Please try again later.");
  }

  return <Chat userId={userId} />;
};

export default ChatIndexPage;
