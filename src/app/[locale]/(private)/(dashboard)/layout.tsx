import { auth } from "@/auth";
import JoTaiProvider from "@/components/providers/JotaiProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/chat.css";
import { SessionProvider } from "next-auth/react";
import { cache } from "react";

const getAuth = cache(async () => {
  return await auth();
});

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();

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
      <ReactQueryProvider>
        <JoTaiProvider>
          <TooltipProvider delayDuration={100}>
            <div className="relative flex min-h-screen overflow-hidden">
              {children}
            </div>
          </TooltipProvider>
        </JoTaiProvider>
      </ReactQueryProvider>
      <Toaster closeButton position="top-right" />
    </SessionProvider>
  );
}
