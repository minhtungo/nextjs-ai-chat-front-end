import { auth } from "@/auth";
import JoTaiProvider from "@/components/providers/JotaiProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
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
          <div className="relative flex min-h-screen">{children}</div>
        </JoTaiProvider>
      </ReactQueryProvider>
      <Toaster closeButton position="top-right" />
    </SessionProvider>
  );
}
