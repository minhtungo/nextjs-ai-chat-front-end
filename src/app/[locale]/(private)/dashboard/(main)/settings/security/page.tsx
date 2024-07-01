import ChangePassword from "@/components/dashboard/ChangePassword";
import TwoFactorToggle from "@/components/dashboard/TwoFactorToggle";
import Google from "@/components/icons/Google";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
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
      {!user.isOauth ? (
        <>
          <Separator className="my-6" />
          <ChangePassword />
        </>
      ) : (
        <div className="flex items-center gap-x-1.5">
          <Google className="size-5" />
          <Typography className="text-muted-foreground">
            Logged in with Google
          </Typography>
        </div>
      )}
    </>
  );
};

export default SecurityPage;
