"use client";

import { NAV_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { signInHref } from "@/routes";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signUpHref } from "./../routes";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations("common.Navbar");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  return (
    <nav
      className={cn(
        "sticky inset-x-0 top-0 z-50 h-14 w-full bg-transparent transition-colors duration-300",
        scrolling &&
          "border-b border-border/40 bg-background/80 shadow-sm backdrop-blur",
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden sm:block">
            <ul className="ml-10 flex gap-x-6">
              {NAV_LINKS.map(({ title, href }) => (
                <li
                  key={`${title}-desktop-menu-link`}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-primary",
                    pathname.split(`/${locale}`)[1] === href && "text-primary",
                  )}
                >
                  <Link href={href}>{t(title)}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center space-x-3">
            <div className="hidden items-center space-x-3 sm:flex">
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
            </div>
            <ThemeToggle />
            <MobileMenu />
            <LanguageSwitcher className="hidden sm:flex" />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
