export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      {children}
    </div>
  );
}
