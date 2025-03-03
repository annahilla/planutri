import { useState, useEffect } from "react";

const useSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
    }

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
