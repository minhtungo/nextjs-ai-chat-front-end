import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { useTranslations } from "next-intl";
import Link from "next/link";

import Logo from "@/components/common/Logo";
import LanguageSwitcher from "@/components/public/common/LanguageSwitcher";
import NavLinks from "@/components/public/common/NavLinks";
import ThemeToggle from "@/components/public/common/ThemeToggle";
import { Separator } from "@/components/ui/separator";

const AuthHeader = () => {
  const t = useTranslations("common.Navbar");

  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <nav className="relative h-14 w-full border-b border-border/40 bg-card/80 backdrop-blur-sm transition-opacity">
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
              <LanguageSwitcher />
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default AuthHeader;
