import { ExtendedUser } from "@/types/next-auth";
import { FC } from "react";

import TwoFactorToggle from "./TwoFactorToggle";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";

interface UserProfileProps {
  user: ExtendedUser | undefined;
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
