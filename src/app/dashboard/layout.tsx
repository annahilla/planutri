import SideNavbar from "@/components/sidebar/SideNavbar";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchIngredients } from "@/services/ingredientService";
import { fetchUnits } from "@/services/unitService";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
  });

  await queryClient.prefetchQuery({
    queryKey: ["units"],
    queryFn: fetchUnits,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex flex-col min-h-screen bg-white md:flex-row">
      <HydrationBoundary state={dehydratedState}>
        <SideNavbar />
        <div className="flex-1 m-6 h-auto overflow-hidden lg:mx-10">
          <div className="mb-12 h-auto md:h-full md:w-full md:mb-5">
            {children}
          </div>
        </div>
      </HydrationBoundary>
    </main>
  );
}
