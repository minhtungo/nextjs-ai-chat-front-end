import { FC } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { SOCIAL_LINKS } from "@/lib/constant";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        "mt-16 border-t border-border py-4 sm:mt-20 sm:py-6",
        className,
      )}
    >
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center gap-y-3 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Lumi
          </p>
          <ul className="flex items-center justify-center gap-5 sm:justify-end">
            {SOCIAL_LINKS.map(({ title, href, icon }) => (
              <li key={`social-${title}`}>
                <Link href={href}>{icon}</Link>
              </li>
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
