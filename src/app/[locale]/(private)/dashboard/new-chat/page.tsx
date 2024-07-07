import { getCurrentUser } from "@/lib/auth";
import { nanoid } from "@/lib/utils";
import NewChat from "./components/NewChat";

const ChatPage = async () => {
  const user = await getCurrentUser();

  const chatId = nanoid();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return <NewChat user={user} id={chatId} />;
};

export default ChatPage;
