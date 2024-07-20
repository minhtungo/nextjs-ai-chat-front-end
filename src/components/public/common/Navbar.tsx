"use client";

import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Suspense, useEffect, useState } from "react";
import Logo from "../../common/Logo";
import Container from "../../common/Container";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import debounce from "lodash.debounce";

interface navbarProps {
  navButtons?: React.ReactNode;
}

const Navbar: FC<navbarProps> = ({ navButtons }) => {
  const [scrolling, setScrolling] = useState(false);

  const pathname = usePathname();

  const t = useTranslations("common.Navbar");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = debounce(() => {
    if (window.scrollY > 20) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  }, 100);
  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <nav
        className={cn(
          "h-14 w-full bg-transparent transition-colors duration-300",
          scrolling &&
            "border-b border-border/40 bg-background/80 shadow-sm backdrop-blur",
        )}
      >
        <Container>
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
                      pathname === href && "text-primary",
                    )}
                  >
                    <Link href={href}>{t(title)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="ml-auto flex items-center space-x-3">
              <ThemeToggle />
              {navButtons && <Suspense>{navButtons}</Suspense>}
              <MobileMenu />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
