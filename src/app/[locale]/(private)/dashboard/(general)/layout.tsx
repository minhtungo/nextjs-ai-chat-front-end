import Sidebar from "@/components/Sidebar";
import ChatHistory from "@/components/chat/ChatHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/hooks/use-sidebar";
import Header from "../(chat)/components/Header";
import UserMenu from "../components/UserMenu";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen">
        <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-card duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
          <div className="flex h-full max-h-screen flex-col gap-2 py-3">
            <ScrollArea className="h-full flex-1">
              <ChatHistory className="px-4" />
            </ScrollArea>
            <div className="w-full px-4">
              <UserMenu />
            </div>
          </div>
        </Sidebar>
        <main className="relative flex h-screen w-full flex-1 flex-col overflow-auto pl-0 duration-300 ease-in-out animate-in peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
          <Header />
          <div className="group relative flex h-full w-full flex-1 flex-col gap-4 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
