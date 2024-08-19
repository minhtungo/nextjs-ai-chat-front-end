import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Suspense } from "react";

import Logo from "@/components/common/Logo";
import MobileMenu from "@/components/public/common/MobileMenu";
import NavButtons from "@/components/public/common/NavButtons";
import NavLinks from "@/components/public/common/NavLinks";
import ThemeToggle from "@/components/public/common/ThemeToggle";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const t = useTranslations("common.Navbar");

  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <nav className="relative h-14 w-full border-b border-border/80 bg-card/80 backdrop-blur-sm transition-opacity">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between">
            <div className="w-2/12">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            <NavLinks />
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Separator orientation="vertical" className="h-6" />
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
