import { getCurrentUser } from "@/lib/auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Metadata } from "next";
import GeneralSettings from "@/components/private/settings/GeneralSettings";
import UserProfileForm from "@/components/private/settings/UserProfileForm.server";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return (
    <>
      <UserProfileForm currentUser={currentUser} />
      <Separator className="my-6" />
      <GeneralSettings user={currentUser} />
    </>
  );
};

export default SettingsPage;
