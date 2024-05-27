import ChangePassword from "@/components/dashboard/ChangePassword";
import TwoFactorToggle from "@/components/dashboard/TwoFactorToggle";
import { Separator } from "@/components/ui/separator";
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
      {user.isOauth && (
        <TwoFactorToggle isTwoFactorEnabled={user?.isTwoFactorEnabled} />
      )}
      {user.isOauth && (
        <>
          <Separator className="my-6" />
          <ChangePassword />
        </>
      )}
    </>
  );
};

export default SecurityPage;
