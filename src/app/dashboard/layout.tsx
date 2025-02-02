import AsideNavbar from "@/components/AsideNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col md:flex-row">
      <AsideNavbar />
      {children}
    </main>
  );
}
