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
        <div>
          <Typography variant="h5" tag="h3">
            Connected accounts
          </Typography>
          <p className="mt-1 text-sm text-muted-foreground">
            Below are the accounts linked to your profile
          </p>
          <div className="mt-3 flex items-center gap-x-2">
            <Google className="size-5" />
            <Typography className="text-muted-foreground">Google</Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default SecurityPage;
