import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex h-[calc(100vh-56px)] w-full items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
