import Container from "@/components/dashboard/Container";
import Typography from "@/components/ui/typography";
import { Suspense } from "react";
import AdminDashboardNav from "./components/AdminDashboardNav";

export default async function AdminDashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="max-w-5xl">
      <Typography variant="h2" tag="h1" className="mb-3">
        Admin Dashboard
      </Typography>
      <Suspense>
        <AdminDashboardNav />
      </Suspense>
      {children}
    </Container>
  );
}
