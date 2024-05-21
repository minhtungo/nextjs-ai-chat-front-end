import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DASHBOARD_LINKS } from "@/lib/constant";
import { Menu } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface DMobileMenuProps {}

const DMobileMenu: FC<DMobileMenuProps> = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          {DASHBOARD_LINKS.map(({ title, href, icon }) => (
            <Link
              key={`${title}-mobile-dashboard-link`}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              {icon}
              {title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default DMobileMenu;
