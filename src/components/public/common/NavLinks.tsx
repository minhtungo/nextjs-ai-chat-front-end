"use client";

import { NAV_LINKS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavLinksProps {
  className?: string;
}

const NavLinks: FC<NavLinksProps> = ({ className }) => {
  const pathname = usePathname();
  const t = useTranslations("common.Navbar");

  return (
    <nav className={cn("hidden sm:block", className)}>
      <ul className="flex gap-x-6">
        {NAV_LINKS.map(({ title, href }) => (
          <li
            key={`${title}-desktop-menu-link`}
            className={cn(
              "text-base hover:text-primary",
              pathname === href && "text-primary",
            )}
          >
            <Link href={href}>{t(title)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
