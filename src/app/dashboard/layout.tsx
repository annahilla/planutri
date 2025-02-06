"use client";

import AsideNavbar from "@/components/AsideNavbar";
import { fetchIngredients } from "@/lib/store/apis/ingredientsSlice";
import { fetchUnits } from "@/lib/store/apis/unitsSlice";
import { useAppDispatch } from "@/lib/store/reduxHooks";
import { Suspense } from "react";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUnits());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <main className="flex flex-col md:flex-row w-screen">
      <div className="w-full md:w-64">
        <AsideNavbar />
      </div>
      
      <Suspense fallback={<Loading />}>
        <div className="flex-1 mx-10 my-6">
          <div className="mb-16 md:mb-0 md:w-full">{children}</div>
        </div>
      </Suspense>
      
    </main>
  );
}
