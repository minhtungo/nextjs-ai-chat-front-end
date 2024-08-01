import { getCurrentUser } from "@/lib/auth";

import Dashboard from "@/components/private/dashboard/Dashboard";
import { encodeDataAction } from "@/actions/centrifuge";

const ChatPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  const [encodedData] = await encodeDataAction();

  if (!encodedData) {
    throw new Error("Error encoding data");
  }

  return <Dashboard user={user} encodedData={encodedData} />;
};

export default ChatPage;
