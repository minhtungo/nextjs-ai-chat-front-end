import ClientOnly from "@/components/common/ClientOnly";
import AttachmentsSidebar from "@/components/private/common/AttachmentsSidebar";
import ChatSidebar from "@/components/private/common/ChatSidebar";
import MainArea from "@/components/private/common/MainArea";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly>
      <ChatSidebar />
      <AttachmentsSidebar />
      <MainArea className="pr-0 transition-all duration-300 ease-in-out lg:pl-[70px] peer-[[data-state=open]]/attachments:lg:pr-[250px] peer-[[data-state=open]]/chat:lg:pl-[300px]">
        {children}
      </MainArea>
    </ClientOnly>
  );
}
