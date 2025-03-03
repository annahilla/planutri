"use client";

import SideNavbarItems from "./SideNavbarItems";
import CollapseNavbarButton from "./CollapseNavbarButton";
import UserDropdown from "./UserDropdown";
import SideNavbarLogo from "./SideNavbarLogo";
import useSidebarState from "@/hooks/useSidebarState";

const SideNavbar = () => {
  const { isCollapsed } = useSidebarState();

  return (
    <div
      className={`transition-all duration-300 ${
        isCollapsed ? "md:w-16" : "md:w-56"
      }`}
      suppressHydrationWarning={true}
    >
      <nav
        className={`${
          isCollapsed ? "md:w-16" : "md:w-56"
        } z-[1000] fixed justify-center items-center flex bottom-0 bg-brown text-neutral-200 w-full shrink-0 md:h-full md:flex-col md:pt-4 md:bottom-auto md:justify-between md:items-start`}
      >
        <div className="md:w-full">
          <CollapseNavbarButton />
          <SideNavbarLogo />
          <SideNavbarItems />
        </div>
        <UserDropdown />
      </nav>
    </div>
  );
};

export default SideNavbar;
