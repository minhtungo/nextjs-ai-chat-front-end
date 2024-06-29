import Chat from "@/components/chat/Chat";
import { getCurrentUser } from "@/lib/auth";
import { AI } from "@/lib/chat/actions";
import { nanoid } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
};

const IndexPage = async () => {
  const user = await getCurrentUser();
  const id = nanoid();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} user={user} />
    </AI>
  );
};

export default IndexPage;
