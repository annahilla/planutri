import SideNavbar from "@/components/sidebar/SideNavbar";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  const isLoggedIn = token ? true : false;

  return (
    <ProtectedRoute canActivate={isLoggedIn} redirectPath="/login">
      <main className="flex flex-col min-h-screen bg-white md:flex-row">
        <SideNavbar />
        <div className="flex-1 m-6 h-auto overflow-hidden lg:mx-10">
          <div className="mb-12 h-auto md:h-full md:w-full md:mb-5">
            {children}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
