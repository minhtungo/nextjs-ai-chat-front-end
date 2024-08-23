import ChatHeader from "@/components/private/common/ChatHeader";
import ChatSidebar from "@/components/private/common/ChatSidebar";
import MainArea from "@/components/private/common/MainArea";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ChatSidebar />
      <MainArea>
        <ChatHeader />
        <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden pb-3 pt-6">
          {children}
        </div>
      </MainArea>
    </>
  );
}
