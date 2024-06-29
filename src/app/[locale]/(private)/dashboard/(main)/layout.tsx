import Container from "@/components/dashboard/Container";
export default async function ChildDashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Container>{children}</Container>;
}
