import SettingsNav from "@/components/dashboard/SettingNav";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SettingsNav />
      {children}
    </>
  );
}
