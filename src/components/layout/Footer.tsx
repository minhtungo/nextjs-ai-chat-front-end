import Logo from "@/components/common/Logo";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import SocialLinks from "@/components/common/SocialLinks";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import { FOOTER_URLS } from "@/lib/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface FooterProps extends React.ComponentProps<"footer"> {}

const Footer = ({ className, ...props }: FooterProps) => {
  const t = useTranslations("common.Navbar");
  return (
    <footer className={className} {...props}>
      <MaxWidthWrapper className="space-y-6 pb-4">
        <div className="flex flex-col flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <div className="space-y-4 text-center sm:text-left">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          {/* <LanguageSwitcher showIcon /> */}
          {/* <SocialLinks /> */}
          <ThemeSwitcher />
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-y-4 text-xs sm:flex-row">
          <div className="text-muted-foreground sm:w-3/12">
            © {new Date().getFullYear()} Lumi. All rights Reserved.
          </div>
          <ul className="flex flex-1 items-center justify-end gap-x-4">
            {FOOTER_URLS.map(({ title, href }) => (
              <li
                key={`footer-${title}`}
                className="text-muted-foreground hover:text-primary"
              >
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
