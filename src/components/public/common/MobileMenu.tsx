import SheetWrapper from "@/components/common/SheetWrapper";
import { buttonVariants } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { NAV_LINKS, signInHref, signUpHref } from "@/lib/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

const MobileMenu = () => {
  const t = useTranslations("common.Navbar");

  return (
    <SheetWrapper
      triggerClassName="md:hidden"
      content={
        <>
          <nav className="h-full flex-1">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ title, href }) => (
                <SheetClose key={`${title}-mobile-menu-item`} asChild>
                  <li className="border-t border-border font-normal first:border-none">
                    <Link
                      className="inline-block w-full py-3 hover:text-primary"
                      href={href}
                    >
                      {t(title)}
                    </Link>
                  </li>
                </SheetClose>
              ))}
            </ul>
          </nav>
          <SheetFooter className="mt-4 gap-2 py-4">
            <SheetClose asChild>
              <Link
                href={signUpHref}
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                {t("SignUp.title")}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={signInHref} className={buttonVariants({})}>
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
