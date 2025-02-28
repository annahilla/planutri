import useSidebarState from "@/hooks/useSidebarState";
import { PiSidebarSimpleLight } from "react-icons/pi";

const CollapseNavbarButton = () => {
  const { isCollapsed, toggleSidebar } = useSidebarState();

  return (
    <button
      onClick={toggleSidebar}
      type="button"
      className={`${
        isCollapsed ? "justify-center mb-6" : "justify-end"
      } mb-2 w-full px-3 hover:opacity-70 hidden outline-none md:flex`}
    >
      <PiSidebarSimpleLight />
    </button>
  );
};

export default CollapseNavbarButton;
