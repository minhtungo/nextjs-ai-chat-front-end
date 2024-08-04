import { FC } from "react";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/routes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  const t = useTranslations("common.Navbar");
  return (
    <footer className={cn("border-t border-border py-6", className)}>
      <MaxWidthWrapper className="space-y-4">
        <div className="flex flex-col flex-wrap items-center justify-between gap-4 sm:flex-row">
          <ul className="flex gap-x-12 gap-y-4 text-left text-sm sm:items-center sm:justify-center">
            {FOOTER_LINKS.map(({ title, href }) => (
              <li
                key={`footer-${title}`}
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href={href}>{t(title)}</Link>
              </li>
            ))}
          </ul>

          <LanguageSwitcher />
        </div>
        <div className="flex flex-col flex-wrap items-center justify-between gap-4 sm:flex-row">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lumi. All rights Reserved.
          </div>
          <div className="flex items-center justify-center gap-x-6">
            {SOCIAL_LINKS.map(({ title, href, icon }) => (
              <div key={`social-${title}`}>
                <Link href={href}>{icon}</Link>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
