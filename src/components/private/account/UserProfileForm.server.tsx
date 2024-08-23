import { getUserById } from "@/data/user";
import { User } from "next-auth";
import UserProfileForm from "./UserProfileForm.client";

const UserProfileFormServer = async ({ user }: { user: User }) => {
  const currentUser = await getUserById(user.id!, {
    include: {
      settings: true,
    },
  });

  return <UserProfileForm user={currentUser as any} />;
};

export default UserProfileFormServer;
