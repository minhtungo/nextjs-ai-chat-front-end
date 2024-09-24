"use client";

import { authRoutes } from "@/app-config";
import { HEADER_URLS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

interface HeaderLinksProps extends ComponentProps<"div"> {}

const HeaderLinks = ({ className }: HeaderLinksProps) => {
  const pathname = usePathname();
  const t = useTranslations("common.Navbar");

  if (authRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav className={cn("hidden md:block", className)}>
      <ul className="flex gap-x-12">
        {HEADER_URLS.map(({ title, href }) => (
          <li
            key={`${title}-desktop-menu-link`}
            className={cn(
              "text-sm hover:text-primary",
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

export default HeaderLinks;
