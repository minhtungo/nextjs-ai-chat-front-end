import { auth } from "@/auth";
import NewMessageButton from "@/components/NewMessageButton";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import ChatHistory from "@/components/chat/ChatHistory";
import DMobileMenu from "@/components/dashboard/DMobileMenu";
import DSideMenu from "@/components/dashboard/DSideMenu";
import FeedbackDropdown from "@/components/dashboard/FeedbackDropdown";
import Header from "@/components/dashboard/Header";
import SidebarToggle from "@/components/dashboard/SidebarToggle";
import UserMenu from "@/components/dashboard/UserMenu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { SessionProvider } from "next-auth/react";
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
      <SidebarProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="relative flex h-[calc(100vh-56px)] w-full flex-1 overflow-auto">
            <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted/40 duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
              <div className="flex h-full max-h-screen flex-col gap-2 py-3">
                <ScrollArea className="h-full flex-1">
                  <ChatHistory />
                  <DSideMenu />
                </ScrollArea>
                <div className="w-full px-2 lg:px-3">
                  <UserMenu className="w-full" />
                </div>
              </div>
            </Sidebar>
            <div className="group relative flex h-[calc(100vh-56px)] w-full flex-1 flex-col gap-4 overflow-hidden pl-0 duration-300 ease-in-out animate-in peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
              {children}
            </div>
          </main>
        </div>
        <Toaster closeButton />
      </SidebarProvider>
    </SessionProvider>
  );
}
