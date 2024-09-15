import AttachmentsSidebar from "@/components/private/common/AttachmentsSidebar";
import ChatSidebar from "@/components/private/common/ChatSidebar";
import MainArea from "@/components/private/common/MainArea";
import { SidebarProvider } from "@/hooks/use-sidebar";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <AttachmentsSidebar />
      <MainArea className="pl-0 pr-0 transition-all duration-300 ease-in-out peer-[[data-state=open]]/attachments:lg:pr-[250px] peer-[[data-state=open]]/chat:lg:pl-[300px]">
        {children}
      </MainArea>
    </SidebarProvider>
  );
}
