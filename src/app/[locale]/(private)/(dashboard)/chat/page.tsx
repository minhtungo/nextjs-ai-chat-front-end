import Chat from "@/components/private/chat/Chat";
import { getChatUserIdUseCase } from "@/use-cases/session";
import { logger } from "@/lib/logger";
const log = logger.child({ module: "totoro" });

const ChatIndexPage = async () => {
  const userId = await getChatUserIdUseCase();

  log.debug("called");

  console.log("*****************ChatIndexPage", userId);

  if (!userId) {
    throw new Error("Something went wrong! Please try again later.");
  }

  return <Chat userId={userId} />;
};

export default ChatIndexPage;
