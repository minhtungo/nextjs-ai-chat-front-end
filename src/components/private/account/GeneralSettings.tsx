import DeleteAllChatButton from "@/components/private/account/DeleteAllChatButton";
import { Card } from "@/components/ui/card";

const GeneralSettings = () => {
  return (
    <Card
      className="flex w-full max-w-3xl items-center justify-between pb-4 sm:pb-6"
      noBorderMobile
    >
      <span className="text-base font-medium">Delete all chats</span>
      <DeleteAllChatButton />
    </Card>
  );
};

export default GeneralSettings;
