import { auth } from "@/auth";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import DMobileMenu from "@/components/dashboard/DMobileMenu";
import DSideMenu from "@/components/dashboard/DSideMenu";
import FeedbackDropdown from "@/components/dashboard/FeedbackDropdown";
import UserMenu from "@/components/dashboard/UserMenu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      isTwoFactorEnabled: session.user.isTwoFactorEnabled,
      isOauth: session.user.isOauth,
    };
  }
  return (
    <SessionProvider session={session}>
      <div className="grid min-h-screen w-full overflow-hidden md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2 pb-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Logo />
              </Link>
            </div>
            <ScrollArea className="h-full flex-1">
              <DSideMenu />
            </ScrollArea>
            <div className="w-full px-2 lg:px-3">
              <UserMenu className="w-full" />
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-1 flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <DMobileMenu />
            <div className="ml-auto flex items-center gap-x-2">
              <FeedbackDropdown />
              <ThemeToggle />
            </div>
          </header>
          <main className="relative flex h-full max-h-[calc(100vh-56px)] w-full flex-1 flex-col gap-4 overflow-hidden lg:max-h-[calc(100vh-60px)]">
            {children}
          </main>
        </div>
      </div>
      <Toaster closeButton />
    </SessionProvider>
  );
}
