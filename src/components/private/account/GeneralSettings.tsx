import DeleteAllChatButton from "@/components/private/account/DeleteAllChatButton";
import UpdateSettingsForm from "@/components/private/account/UpdateSettingsForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { User } from "next-auth";

const GeneralSettings = ({ user }: { user: User }) => {
  return (
    <Card noBorderMobile>
      <CardContent>
        <CardTitle className="mb-6">Settings</CardTitle>
        <UpdateSettingsForm user={user} />
        <div className="flex w-full items-center justify-between border-t pt-6">
          <span className="text-base font-medium">Delete all chats</span>
          <DeleteAllChatButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
