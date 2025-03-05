import SideNavbar from "@/components/sidebar/SideNavbar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen bg-white md:flex-row">
      <SideNavbar />
      <div className="flex-1 m-6 h-auto overflow-hidden lg:mx-10">
        <div className="mb-16 h-auto md:h-full md:w-full md:mb-5">
          {children}
        </div>
      </div>
    </main>
  );
}
