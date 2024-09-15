import { auth } from "@/auth";
import AccountHeader from "@/components/private/common/AccountHeader";
import AccountSidebar from "@/components/private/common/AccountSidebar";
import MainArea from "@/components/private/common/MainArea";
import ScrollAreaContainer from "@/components/private/common/ScrollAreaContainer";
import { SessionProvider } from "next-auth/react";
import { cache } from "react";

const getAuth = cache(async () => {
  return await auth();
});

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();

  if (session && session.user) {
    session.user = {
      ...session.user,
    };
  }

  return (
    <SessionProvider session={session}>
      <AccountSidebar />
      <MainArea className="pl-0 lg:pl-[300px]">
        <AccountHeader />
        <ScrollAreaContainer className="relative max-w-5xl py-6">
          {children}
        </ScrollAreaContainer>
      </MainArea>
    </SessionProvider>
  );
}
