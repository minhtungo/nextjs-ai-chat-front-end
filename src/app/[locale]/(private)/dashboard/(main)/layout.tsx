import Container from "@/components/dashboard/Container";
import Typography from "@/components/ui/typography";
export default async function ChildDashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="max-w-3xl">
      <Typography variant="h2" tag="h1" className="mb-3">
        Settings
      </Typography>
      {children}
    </Container>
  );
}
