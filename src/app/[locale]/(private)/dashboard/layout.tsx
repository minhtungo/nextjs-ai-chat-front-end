import { auth } from "@/auth";
import JoTaiProvider from "@/components/providers/JotaiProvider";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { SessionProvider } from "next-auth/react";
import "./dashboard.css";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // if (!session?.user.isOnboarded) {
  //   redirect("/onboarding");
  // }

  if (session && session.user) {
    session.user = {
      ...session.user,
    };
  }
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <JoTaiProvider>{children}</JoTaiProvider>
      </SidebarProvider>
      <Toaster closeButton />
    </SessionProvider>
  );
}
