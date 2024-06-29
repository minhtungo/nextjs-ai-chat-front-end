import { FC } from "react";

import UserInfo from "./UserInfo";
import { User } from "next-auth";

interface UserProfileProps {
  user?: User;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  return <UserInfo user={user} />;
};

export default UserProfile;
