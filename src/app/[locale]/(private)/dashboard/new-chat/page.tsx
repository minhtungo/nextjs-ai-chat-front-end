import NewChat from "./NewChat";
import { getCurrentUser } from "@/lib/auth";
import { nanoid } from "@/lib/utils";

const NewChatPage = async () => {
  const user = await getCurrentUser();
  const chatId = nanoid();
  console.log("===============", chatId);

  if (!user) {
    throw new Error("Unauthorized");
  }

  console.log("user", user.id);

  return <NewChat user={user} chatId={chatId} />;
};

export default NewChatPage;
