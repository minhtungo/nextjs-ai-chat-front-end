import Typography from "@/components/ui/typography";
import { Suspense } from "react";
import Nav from "@/components/admin/Nav";
import ScrollAreaContainer from "@/components/layout/ScrollAreaContainer";

export default async function AdminDashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollAreaContainer className="max-w-5xl">
      <Typography variant="h2" tag="h1" className="mb-3">
        Admin Dashboard
      </Typography>
      <Suspense>
        <Nav />
      </Suspense>
      {children}
    </ScrollAreaContainer>
  );
}
