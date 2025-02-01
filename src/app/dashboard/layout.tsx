export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <aside className="bg-neutral-200 w-16 min-h-screen shrink-0 md:w-64"></aside>
      {children}
    </main>
  );
}
