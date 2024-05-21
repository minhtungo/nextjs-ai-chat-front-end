import { ExtendedUser } from "@/types/next-auth";
import { FC } from "react";

import TwoFactorSetting from "./TwoFactorSetting";
import UserInfo from "./UserInfo";

interface UserProfileProps {
  user: ExtendedUser;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <>
      <UserInfo user={user} />
      <TwoFactorSetting isTwoFactorEnabled={user.isTwoFactorEnabled} />
    </>
  );
};

export default UserProfile;
