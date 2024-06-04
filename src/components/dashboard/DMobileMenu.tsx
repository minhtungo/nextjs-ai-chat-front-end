import { DASHBOARD_MOBILE_LINKS } from "@/lib/constant";
import Link from "next/link";
import { FC } from "react";
import SheetWrapper from "../SheetWrapper";
import { SheetClose } from "../ui/sheet";

interface DMobileMenuProps {}

const DMobileMenu: FC<DMobileMenuProps> = () => {
  return (
    <SheetWrapper side="left" className="lg:hidden">
      <nav>
        <ul className="flex flex-col">
          {DASHBOARD_MOBILE_LINKS.map(({ title, href, icon }) => (
            <li
              key={`${title}-dashboard-menu-item`}
              className="border-t border-border py-2.5 font-medium first:border-none"
            >
              <SheetClose asChild>
                <Link
                  key={`${title}-mobile-dashboard-item`}
                  href={href}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
                  {icon}
                  {title}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </nav>
    </SheetWrapper>
  );
};

export default DMobileMenu;
