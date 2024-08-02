import { getCurrentUser } from "@/lib/auth";

import Dashboard from "@/components/private/dashboard/Dashboard";

const ChatPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return <Dashboard user={user} />;
};

export default ChatPage;
