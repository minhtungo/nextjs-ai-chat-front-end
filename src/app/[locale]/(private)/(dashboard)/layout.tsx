import JoTaiProvider from "@/components/providers/JotaiProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/chat.css";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <JoTaiProvider>
        <TooltipProvider delayDuration={100}>
          <div className="relative flex min-h-screen overflow-hidden">
            {children}
          </div>
          <Toaster closeButton position="top-right" />
        </TooltipProvider>
      </JoTaiProvider>
    </ReactQueryProvider>
  );
}
