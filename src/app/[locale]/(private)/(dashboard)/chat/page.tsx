import { getChatUserIdAction } from "@/actions/api";
import Chat from "@/components/private/chat/Chat";

const ChatIndexPage = async () => {
  const [data] = await getChatUserIdAction();

  console.log("*****************ChatIndexPage", data);

  return <Chat userId={data?.id!} />;
};

export default ChatIndexPage;
