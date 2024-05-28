import { auth } from "@/auth";
import Chat from "@/components/dashboard/Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lumi Chatbot",
};

const Dashboard = async () => {
  const session = await auth();

  return <Chat />;
};

export default Dashboard;
