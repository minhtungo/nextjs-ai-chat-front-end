"use client";

import { buttonVariants } from "@/components/ui/button";
import { SETTINGS_LINKS } from "@/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNav = () => {
  const pathname = usePathname();

  return (
    <div role="tablist" className="relative mb-4 flex items-center gap-2">
      {SETTINGS_LINKS.map(({ href, title }) => (
        <Link
          href={`/${href}`}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "md",
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

export default SettingsNav;
