import { useState, useEffect } from "react";

const useSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
    window.dispatchEvent(new Event("storage"));
  };

  return { isCollapsed, toggleSidebar };
};

export default useSidebarState;
