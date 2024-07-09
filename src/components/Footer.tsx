import { FC } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/routes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  const t = useTranslations("common.Navbar");
  return (
    <footer className={cn("mt-12 border-t border-border py-8", className)}>
      <MaxWidthWrapper className="space-y-6">
        <ul className="flex flex-col gap-x-12 gap-y-4 text-left text-sm sm:flex-row sm:items-center sm:justify-center">
          {FOOTER_LINKS.map(({ title, href }) => (
            <li
              key={`social-${title}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href={href}>{t(title)}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-x-6">
          {SOCIAL_LINKS.map(({ title, href, icon }) => (
            <div key={`social-${title}`}>
              <Link href={href}>{icon}</Link>
            </div>
          ))}
        </div>
        <div className="mx-auto flex justify-center text-center">
          <LanguageSwitcher />
        </div>
        <div className="mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lumi. All rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
