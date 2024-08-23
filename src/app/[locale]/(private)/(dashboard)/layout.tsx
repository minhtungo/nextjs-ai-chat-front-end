import { auth } from "@/auth";
import JoTaiProvider from "@/components/providers/JotaiProvider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { cache } from "react";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import "@/styles/dashboard.css";

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
      <ReactQueryProvider>
        <JoTaiProvider>
          <div className="relative flex min-h-screen">{children}</div>
        </JoTaiProvider>
      </ReactQueryProvider>
      <Toaster closeButton position="top-right" />
    </SessionProvider>
  );
}
