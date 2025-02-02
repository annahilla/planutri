import AsideNavbar from "@/components/AsideNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col md:flex-row overflow-x-hidden">
      <AsideNavbar />
      <div className="mb-16 md:mb-0">{children}</div>
    </main>
  );
}
