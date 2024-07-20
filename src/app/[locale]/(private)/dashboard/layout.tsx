import { auth } from "@/auth";
import JoTaiProvider from "@/components/providers/JotaiProvider";
import { ReactQueryClientProvider } from "@/components/providers/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { cache } from "react";
import "./dashboard.css";

const getAuth = cache(async () => {
  return await auth();
});

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();

  if (!session?.user.isOnboarded) {
    redirect("/onboarding");
  }

  if (session && session.user) {
    session.user = {
      ...session.user,
    };
  }
  return (
    <SessionProvider session={session}>
      <ReactQueryClientProvider>
        <JoTaiProvider>{children}</JoTaiProvider>
      </ReactQueryClientProvider>
      <Toaster closeButton />
    </SessionProvider>
  );
}
