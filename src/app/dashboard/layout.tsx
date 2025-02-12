"use client";

import { fetchIngredients } from "@/lib/store/apis/ingredientsSlice";
import { fetchUnits } from "@/lib/store/apis/unitsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { useState } from "react";
import { useEffect } from "react";
import SideNavbar from "@/components/SideNavbar";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { fetchMenu } from "@/lib/store/menu/menuSlice";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isNavbarCollapsed") === "true";
    }
    return false;
  });
  const isLoggedIn = useAppSelector((state) => state.auth.user) ? true : false;

  useEffect(() => {
    dispatch(fetchUnits());
    dispatch(fetchIngredients());
    dispatch(fetchMenu());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("isNavbarCollapsed", String(isNavbarCollapsed));
  }, [isNavbarCollapsed]);

  return (
    <ProtectedRoute canActivate={isLoggedIn} redirectPath="/login">
      <main className="flex flex-col min-h-screen bg-beige md:flex-row">
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

        <div className="flex-1 m-6 h-auto overflow-hidden lg:mx-10">
          <div className="mb-16 md:mb-0 h-auto md:h-full md:w-full">
            {children}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
