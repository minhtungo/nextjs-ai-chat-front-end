import AttachmentsSidebar from "@/components/private/common/AttachmentsSidebar";
import ChatSidebar from "@/components/private/common/ChatSidebar";
import MainArea from "@/components/private/common/MainArea";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { getCurrentUser } from "@/lib/auth";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <SidebarProvider>
      <ChatSidebar user={user} />
      <AttachmentsSidebar user={user} />
      <MainArea className="pl-0 pr-0 transition-all duration-300 ease-in-out peer-[[data-state=open]]/attachments:lg:pr-[250px] peer-[[data-state=open]]/chat:lg:pl-[300px]">
        {children}
      </MainArea>
    </SidebarProvider>
  );
}
