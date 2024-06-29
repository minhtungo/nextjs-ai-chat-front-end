import SettingsNav from "@/components/dashboard/SettingNav";
import { Suspense } from "react";

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <SettingsNav />
      </Suspense>
      <div className="flex-1 lg:max-w-3xl">{children}</div>
    </>
  );
}
