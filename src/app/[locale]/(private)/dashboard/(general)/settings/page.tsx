import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";
import { Suspense } from "react";
import UserProfileForm from "./components/UserProfileForm.server";
import { Separator } from "@radix-ui/react-dropdown-menu";
import GeneralSettings from "./components/GeneralSettings";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfileForm currentUser={currentUser} />
      <Separator className="my-6" />
      <GeneralSettings user={currentUser} />
    </Suspense>
  );
};

export default SettingsPage;
