import JoTaiProvider from "@/components/providers/JotaiProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/chat.css";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <JoTaiProvider>
        <div className="relative flex min-h-screen overflow-hidden">
          {children}
        </div>
        <Toaster closeButton position="top-right" />
      </JoTaiProvider>
    </ReactQueryProvider>
  );
}
