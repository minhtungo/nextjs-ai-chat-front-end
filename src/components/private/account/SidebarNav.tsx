"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ACCOUNT_URLS } from "@/lib/routes";
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
      {ACCOUNT_URLS.map(({ href, title, icon }) => (
        <Link
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start px-3",
            pathname === href && "bg-accent text-foreground",
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
