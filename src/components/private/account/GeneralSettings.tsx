import DeleteAllChatButton from "@/components/private/account/DeleteAllChatButton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const GeneralSettings = () => {
  return (
    <Card noBorderMobile>
      <CardContent>
        <CardTitle className="mb-6">General Settings</CardTitle>
        <div className="flex w-full items-center justify-between">
          <span className="text-base font-medium">Delete all chats</span>
          <DeleteAllChatButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
