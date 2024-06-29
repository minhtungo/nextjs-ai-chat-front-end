import UserProfile from "@/components/dashboard/UserProfile";
import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const userWithSettings = await getUserById(user?.id!, {
    include: {
      settings: true,
    },
  });

  console.log(userWithSettings);

  return <UserProfile user={userWithSettings} />;
};

export default SettingsPage;
