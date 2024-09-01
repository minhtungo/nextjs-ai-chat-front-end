import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Suspense } from "react";

import Logo from "@/components/common/Logo";
import LanguageSwitcher from "@/components/public/common/LanguageSwitcher";
import MobileMenu from "@/components/public/common/MobileMenu";
import NavButtons from "@/components/public/common/NavButtons";
import NavLinks from "@/components/public/common/NavLinks";
import { Separator } from "@/components/ui/separator";

const PublicHeader = () => {
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
            <div className="flex items-center space-x-3">
              {/* <ThemeToggle /> */}
              <Suspense>
                <NavButtons />
              </Suspense>
              <Separator
                orientation="vertical"
                className="hidden h-6 md:block"
              />
              <LanguageSwitcher showIcon />
              <Separator orientation="vertical" className="h-6 md:hidden" />
              <MobileMenu />
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default PublicHeader;
