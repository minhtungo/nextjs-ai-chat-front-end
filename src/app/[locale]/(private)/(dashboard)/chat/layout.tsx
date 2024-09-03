import ChatHeader from "@/components/private/common/ChatHeader";
import ChatSidebar from "@/components/private/common/ChatSidebar";
import MainArea from "@/components/private/common/MainArea";
import { getCurrentUser } from "@/lib/auth";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <>
      <ChatSidebar user={user} />
      <MainArea>
        <ChatHeader user={user} />
        <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden pb-3 pt-6">
          {children}
        </div>
      </MainArea>
    </>
  );
}
