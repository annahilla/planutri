"use client";

import { fetchIngredients } from "@/lib/store/apis/ingredientsSlice";
import { fetchUnits } from "@/lib/store/apis/unitsSlice";
import { useAppDispatch } from "@/lib/store/reduxHooks";
import { Suspense, useState } from "react";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import SideNavbar from "@/components/SideNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  useEffect(() => {
    dispatch(fetchUnits());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <main className="flex flex-col md:flex-row h-screen">
      <div
        className={`transition-all duration-300 ${
          isNavbarCollapsed ? "md:w-16" : "md:w-64"
        }`}
      >
        <SideNavbar
          isNavbarCollapsed={isNavbarCollapsed}
          setIsNavbarCollapsed={setIsNavbarCollapsed}
        />
      </div>

      <Suspense fallback={<Loading />}>
        <div className="flex-1 mx-10 my-6 h-full">
          <div className="mb-16 md:mb-0 h-full md:w-full">{children}</div>
        </div>
      </Suspense>
    </main>
  );
}
