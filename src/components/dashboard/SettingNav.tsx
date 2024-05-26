"use client";

import { buttonVariants } from "@/components/ui/button";
import { SETTINGS_LINKS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNav = () => {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <>
      <div role="tablist" className="relative mb-4 flex items-center gap-2">
        {SETTINGS_LINKS.map(({ href, title }) => (
          <Link
            href={href}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "md",
              }),
              "text-muted-foreground",
              pathname.split(`/${locale}`)[1] === href &&
                "bg-accent text-primary",
            )}
            key={`${title}-setting-item`}
          >
            {title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SettingsNav;
