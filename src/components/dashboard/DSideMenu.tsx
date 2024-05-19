"use client";

import { FC } from "react";
import { DASHBOARD_LINKS } from "@/lib/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DSideMenuProps {}

const DSideMenu: FC<DSideMenuProps> = () => {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-3">
      {DASHBOARD_LINKS.map(({ title, href, icon }) => (
        <Link
          key={`${title}-desktop-dashboard-link`}
          href={href}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent",
            pathname === href && "bg-accent",
          )}
        >
          {icon}
          {title}
        </Link>
      ))}
    </nav>
  );
};

export default DSideMenu;
