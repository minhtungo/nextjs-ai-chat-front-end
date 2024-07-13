import SettingsNav from "@/components/dashboard/SettingNav";
import { Suspense } from "react";
import Container from "@/components/dashboard/Container";
import Typography from "@/components/ui/typography";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container className="max-w-3xl">
      <Typography variant="h2" tag="h1" className="mb-3">
        Settings
      </Typography>
      <Suspense>
        <SettingsNav />
      </Suspense>
      <div className="flex-1">{children}</div>
    </Container>
  );
}
