"use client";

import { NAV_LINKS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  const t = useTranslations("common.Navbar");

  return (
    <nav className="hidden sm:block">
      <ul className="ml-10 flex gap-x-6">
        {NAV_LINKS.map(({ title, href }) => (
          <li
            key={`${title}-desktop-menu-link`}
            className={cn(
              "text-sm font-medium hover:text-primary/80",
              pathname === href && "text-primary/80",
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
