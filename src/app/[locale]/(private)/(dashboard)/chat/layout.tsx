import ClientOnly from "@/components/common/ClientOnly";
import AttachmentsSidebar from "@/components/private/common/AttachmentsSidebar";
import ChatSidebar from "@/components/private/common/ChatSidebar";
import MainArea from "@/components/private/common/MainArea";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly>
      <TooltipProvider delayDuration={100}>
        <ChatSidebar />
      </TooltipProvider>
      <TooltipProvider delayDuration={100}>
        <AttachmentsSidebar />
      </TooltipProvider>
      <MainArea className="pr-0 transition-all duration-300 ease-in-out lg:pl-[70px] peer-[[data-state=open]]/attachments:lg:pr-[260px] peer-[[data-state=open]]/chat:lg:pl-[300px]">
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </MainArea>
    </ClientOnly>
  );
}
