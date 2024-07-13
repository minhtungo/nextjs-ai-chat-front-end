import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import "./dashboard.css";
import JoTaiProvider from "@/components/providers/JotaiProvider";
import { redirect } from "next/navigation";

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
      <JoTaiProvider>{children}</JoTaiProvider>
      <Toaster closeButton />
    </SessionProvider>
  );
}
