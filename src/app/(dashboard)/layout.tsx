import { Search, SquarePen } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/Logo";
import DMobileMenu from "@/components/dashboard/DMobileMenu";
import UserMenu from "@/components/dashboard/UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DASHBOARD_LINKS } from "@/lib/constant";
import ThemeToggle from "@/components/ThemeToggle";
export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <SquarePen className="h-4 w-4" />
              <span className="sr-only">Start A New Conversation</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {DASHBOARD_LINKS.map(({ title, href, icon }) => (
                <Link
                  key={`${title}-desktop-dashboard-link`}
                  href={href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
                >
                  {icon}
                  {title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <DMobileMenu />
          <div className="ml-auto flex items-center gap-x-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
