"use client";

import { buttonVariants } from "@/components/ui/button";
import { ACCOUNT_URLS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AccountSidebarLinksProps extends React.ComponentProps<"nav"> {}

const AccountSidebarLinks = ({
  className,
  ...props
}: AccountSidebarLinksProps) => {
  const pathname = usePathname();
  return (
    <nav className={cn("grid gap-y-1.5", className)} {...props}>
      {ACCOUNT_URLS.map(({ href, title, icon: Icon }) => (
        <Link
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start px-3",
            pathname === href && "bg-accent text-foreground",
          )}
          href={href}
          key={`${title}-sidebar-nav-item`}
        >
          <Icon className="size-[18px]" />
          {title}
        </Link>
      ))}
    </nav>
  );
};

export default AccountSidebarLinks;
