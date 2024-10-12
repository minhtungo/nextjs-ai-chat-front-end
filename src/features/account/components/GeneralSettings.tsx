import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DeleteAllChatButton from "@/features/account/components/DeleteAllChatButton";
import UpdateSettingsForm from "@/features/account/components/UpdateSettingsForm";
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
