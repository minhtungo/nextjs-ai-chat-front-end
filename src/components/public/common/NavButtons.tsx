import { chatUrl, signInUrl, signUpUrl } from "@/app-config";
import SignOutButton from "@/components/private/common/SignOutButton";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const NavButtons = async () => {
  const t = await getTranslations("common.Navbar");
  const user = await getCurrentUser();

  return (
    <div className="hidden items-center space-x-3 capitalize md:flex">
      {user ? (
        <>
          <SignOutButton title={t("SignOut.title")} />
          <Link
            href={chatUrl}
            className={buttonVariants({
              size: "sm",
            })}
          >
            {t("Dashboard.title")}
          </Link>
        </>
      ) : (
        <>
          <Link href={signInUrl} className="mr-3 text-sm hover:text-primary">
            {t("SignIn.title")}
          </Link>
          <Link
            href={signUpUrl}
            className={buttonVariants({
              size: "sm",
            })}
          >
            {t("SignUp.title")}
          </Link>
        </>
      )}
    </div>
  );
};

export default NavButtons;
