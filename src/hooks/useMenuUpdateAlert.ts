"use client";

import { useEffect, useState } from "react";
import { MenuInterface } from "@/types/types";

export const useMenuUpdateAlert = (menu: MenuInterface[]) => {
  const [showMenuUpdateAlert, setShowMenuUpdateAlert] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedMenuJSON = localStorage.getItem("lastUpdatedMenu");
    const currentMenuJSON = JSON.stringify(menu);

    setShowMenuUpdateAlert(storedMenuJSON !== currentMenuJSON);
  }, [menu]);

  const dismissAlert = () => {
    localStorage.setItem("lastUpdatedMenu", JSON.stringify(menu));
    setShowMenuUpdateAlert(false);
    window.dispatchEvent(new Event("menuUpdated"));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedMenuJSON = localStorage.getItem("lastUpdatedMenu");
      const currentMenuJSON = JSON.stringify(menu);
      setShowMenuUpdateAlert(storedMenuJSON !== currentMenuJSON);
    };

    window.addEventListener("menuUpdated", handleStorageChange);
    return () => window.removeEventListener("menuUpdated", handleStorageChange);
  }, [menu]);

  return { showMenuUpdateAlert, dismissAlert };
};
