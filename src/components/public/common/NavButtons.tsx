import { getCurrentUser } from "@/lib/auth";
import { PROTECTED_BASE_URL, signInHref, signUpHref } from "@/lib/routes";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "@/components/ui/button";
import SignOutButton from "@/components/private/common/SignOutButton";

interface NavButtonsProps {}

const NavButtons: FC<NavButtonsProps> = async () => {
  const t = await getTranslations("common.Navbar");
  const user = await getCurrentUser();

  return (
    <div className="hidden items-center space-x-3 md:flex">
      {user ? (
        <>
          <SignOutButton title={t("SignOut.title")} />

          <Link
            href={PROTECTED_BASE_URL}
            className={buttonVariants({
              size: "sm",
            })}
          >
            {t("Dashboard.title")}
          </Link>
        </>
      ) : (
        <>
          {/* <LanguageSwitcher className="hidden md:flex" /> */}

          <Link
            href={signUpHref}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            {t("SignUp.title")}
          </Link>

          <Link
            href={signInHref}
            className={buttonVariants({
              size: "sm",
            })}
          >
            {t("SignIn.title")}
          </Link>
        </>
      )}
    </div>
  );
};

export default NavButtons;
