import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";
import { Suspense } from "react";
import UserProfileForm from "./components/UserProfileForm.server";

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
    </Suspense>
  );
};

export default SettingsPage;
