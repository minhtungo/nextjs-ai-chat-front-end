import UserProfile from "@/components/dashboard/UserProfile";
import { getUserAndSettingsById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  const userWithSettings = await getUserAndSettingsById(user?.id);

  console.log(userWithSettings);

  return <UserProfile user={userWithSettings} />;
};

export default SettingsPage;
