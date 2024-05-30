import { auth } from "@/auth";
import Chat from "@/components/dashboard/Chat";
import { getCurrentUser } from "@/lib/auth";
import { AI } from "@/lib/chat/actions";
import { getMissingKeys, nanoid } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumi Chatbot",
};

const IndexPage = async () => {
  const user = getCurrentUser();
  const id = nanoid();
  const missingKeys = await getMissingKeys();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} user={user} missingKeys={missingKeys} />
    </AI>
  );
};

export default IndexPage;
