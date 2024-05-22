import { ExtendedUser } from "@/types/next-auth";
import { FC } from "react";

import TwoFactorToggle from "./TwoFactorToggle";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";

interface UserProfileProps {
  user: ExtendedUser;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <>
      <UserInfo user={user} />
      {!user.isOauth && <ChangePassword />}
      {!user.isOauth && (
        <TwoFactorToggle isTwoFactorEnabled={user.isTwoFactorEnabled} />
      )}
    </>
  );
};

export default UserProfile;
