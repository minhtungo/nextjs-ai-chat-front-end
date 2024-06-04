import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constant";
import { signInHref, signUpHref } from "@/routes";
import Link from "next/link";
import { FC } from "react";
import SheetWrapper from "./SheetWrapper";
import { buttonVariants } from "./ui/button";
import { useTranslations } from "next-intl";

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  const t = useTranslations("common.Navbar");

  return (
    <SheetWrapper
      content={
        <>
          <nav className="h-full flex-1">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ title, href }) => (
                <SheetClose key={`${title}-mobile-menu-item`} asChild>
                  <li className="border-t border-border py-2.5 font-medium first:border-none">
                    <Link className="inline-block w-full" href={href}>
                      {t(title)}
                    </Link>
                  </li>
                </SheetClose>
              ))}
            </ul>
          </nav>
          <SheetFooter className="mt-4 gap-1.5 py-4">
            <SheetClose asChild>
              <Link
                href={signUpHref}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                {t("SignUp.title")}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href={signInHref}
                className={buttonVariants({
                  size: "sm",
                })}
              >
                {t("SignIn.title")}
              </Link>
            </SheetClose>
          </SheetFooter>
        </>
      }
    />
  );
};

export default MobileMenu;
