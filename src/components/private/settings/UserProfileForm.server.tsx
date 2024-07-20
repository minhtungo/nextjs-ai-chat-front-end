import { getUserById } from "@/data/user";
import { User } from "next-auth";
import { FC } from "react";
import UserProfileForm from "./UserProfileForm.client";

interface UserProfileFormServerProps {
  currentUser: User;
}

const UserProfileFormServer: FC<UserProfileFormServerProps> = async ({
  currentUser,
}) => {
  const user = await getUserById(currentUser.id!, {
    include: {
      settings: true,
    },
  });

  return <UserProfileForm user={user as any} />;
};

export default UserProfileFormServer;
