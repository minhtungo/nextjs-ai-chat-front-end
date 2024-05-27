import SettingsNav from "@/components/dashboard/SettingNav";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SettingsNav />
      <div className="flex-1 lg:max-w-3xl">{children}</div>
    </>
  );
}
