import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import "./dashboard.css";
import JoTaiProvider from "@/components/providers/JotaiProvider";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      isTwoFactorEnabled: session.user.isTwoFactorEnabled,
      isOauth: session.user.isOauth,
      preferredLang: session.user.preferredLang,
    };
  }
  return (
    <SessionProvider session={session}>
      <JoTaiProvider>{children}</JoTaiProvider>
      <Toaster closeButton />
    </SessionProvider>
  );
}
