"use client";

import AsideNavbar from "@/components/AsideNavbar";
import { fetchIngredients } from "@/lib/store/apis/ingredientsSlice";
import { fetchUnits } from "@/lib/store/apis/unitsSlice";
import { useAppDispatch } from "@/lib/store/reduxHooks";
import { useEffect } from "react";

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
    <main className="flex flex-col md:flex-row">
      <AsideNavbar />
      <div className="mb-16 md:mb-0 md:w-2/3">{children}</div>
    </main>
  );
}
