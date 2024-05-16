import { FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DASHBOARD_LINKS } from "@/lib/constant";
import Link from "next/link";
import { Menu } from "lucide-react";

interface DMobileMenuProps {}

const DMobileMenu: FC<DMobileMenuProps> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
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
