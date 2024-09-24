"use client";

import { buttonVariants } from "@/components/ui/button";
import { ADMIN_URLS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  return (
    <div role="tablist" className="relative mb-4 flex items-center gap-2">
      {ADMIN_URLS.map(({ href, title }) => (
        <Link
          href={href}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "text-muted-foreground",
            pathname === href && "bg-accent text-primary",
          )}
          key={`${title}-setting-item`}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
