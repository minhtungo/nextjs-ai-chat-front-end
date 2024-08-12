import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Suspense } from "react";

import Logo from "@/components/common/Logo";
import MobileMenu from "@/components/public/common/MobileMenu";
import NavButtons from "@/components/public/common/NavButtons";
import NavLinks from "@/components/public/common/NavLinks";
import ThemeToggle from "@/components/public/common/ThemeToggle";

const Header = () => {
  const t = useTranslations("common.Navbar");

  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <nav className="relative h-14 w-full border-b border-border/40 bg-card/80 backdrop-blur-sm transition-opacity">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center">
            <Link href="/">
              <Logo />
            </Link>
            <NavLinks />
            <div className="ml-auto flex items-center space-x-3">
              <ThemeToggle />
              <Suspense>
                <NavButtons />
              </Suspense>
              <MobileMenu />
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default Header;
