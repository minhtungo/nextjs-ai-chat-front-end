import Typography from "@/components/ui/typography";
import { Suspense } from "react";
import Nav from "./components/Nav";
import Container from "../../components/Container";

export default async function AdminDashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="max-w-7xl">
      <Typography variant="h2" tag="h1" className="mb-3">
        Admin Dashboard
      </Typography>
      <Suspense>
        <Nav />
      </Suspense>
      {children}
    </Container>
  );
}
