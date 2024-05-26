import TwoFactorToggle from "@/components/dashboard/TwoFactorToggle";
import UserProfile from "@/components/dashboard/UserProfile";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const SecurityPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      {!user.isOauth && (
        <TwoFactorToggle isTwoFactorEnabled={user?.isTwoFactorEnabled} />
      )}
    </>
  );
};

export default SecurityPage;
