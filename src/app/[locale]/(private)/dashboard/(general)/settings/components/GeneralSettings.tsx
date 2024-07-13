import { User } from "next-auth";
import { FC } from "react";
import DeleteAllChatButton from "./DeleteAllChatButton";

interface GeneralSettingsProps {
  user: User;
}

const GeneralSettings: FC<GeneralSettingsProps> = ({ user }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>Delete all chats</div>
        <DeleteAllChatButton />
      </div>
    </div>
  );
};

export default GeneralSettings;
