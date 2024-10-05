import { signInUrl, signUpUrl } from "@/config/config";
import SheetWrapper from "@/components/common/SheetWrapper";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { HEADER_URLS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PublicMobileMenuFooter = () => {
  const t = useTranslations("common.Navbar");

  return (
    <div className="flex flex-col items-center justify-stretch gap-2 text-center">
      <SheetFooter className="w-full gap-2">
        <SheetClose asChild>
          <Link
            href={signUpUrl}
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-full",
            )}
          >
            {t("SignUp.title")}
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href={signInUrl} className={buttonVariants({})}>
            {t("SignIn.title")}
          </Link>
        </SheetClose>
      </SheetFooter>
      <ThemeSwitcher />
    </div>
  );
};

const PublicMobileMenu = () => {
  const t = useTranslations("common.Navbar");

  return (
    <SheetWrapper footer={<PublicMobileMenuFooter />}>
      <nav className="h-full flex-1">
        <ul className="flex flex-col gap-1">
          {HEADER_URLS.map(({ title, href }) => (
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
    </SheetWrapper>
  );
};

export default PublicMobileMenu;
