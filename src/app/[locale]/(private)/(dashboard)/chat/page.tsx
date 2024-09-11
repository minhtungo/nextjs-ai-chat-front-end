import ChatArea from "@/components/private/chat/ChatArea";
import { getChatUserIdUseCase } from "@/use-cases/session";

const ChatIndexPage = async () => {
  const userId = await getChatUserIdUseCase();

  if (!userId) {
    throw new Error("Something went wrong! Please try again later.");
  }

  return <ChatArea userId={userId} />;
};

export default ChatIndexPage;
