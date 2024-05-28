import Chat from "@/components/dashboard/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hỏi Lumi",
};

const ChatPage = () => {
  return <Chat />;
};

export default ChatPage;
