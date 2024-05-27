import { ExtendedUser } from "@/types/next-auth";
import { FC } from "react";

import { UserSettings } from "@prisma/client";
import ChangePassword from "./ChangePassword";
import UserInfo from "./UserInfo";

interface UserProfileProps {
  user: ExtendedUser & UserSettings;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  if (!user) return <p>Unauthorized</p>;

  return (
    <>
      <UserInfo user={user} />
      {!user.isOauth && <ChangePassword />}
    </>
  );
};

export default UserProfile;
