"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DASHBOARD_LINKS } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: FC<SidebarNavProps> = ({ className }) => {
  const pathname = usePathname();
  return (
    <nav className={cn("grid gap-y-1.5", className)}>
      {DASHBOARD_LINKS.map(({ href, title, icon }) => (
        <Link
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start px-3",
            pathname === href && "bg-accent text-primary",
          )}
          href={href}
          key={`${title}-sidebar-nav-item`}
        >
          {icon}
          {title}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;
