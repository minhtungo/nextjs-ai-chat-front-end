import { AI } from "@/actions/chat";
import { auth } from "@/auth";
import Chat from "@/components/dashboard/Chat";
import { getMissingKeys, nanoid } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumi Chatbot",
};

const IndexPage = async () => {
  const session = await auth();
  const id = nanoid();
  const missingKeys = await getMissingKeys();

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat />
    </AI>
  );
};

export default IndexPage;
