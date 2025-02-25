"use client";

import SideNavbarItems from "./SideNavbarItems";
import CollapseNavbarButton from "../ui/buttons/CollapseNavbarButton";
import UserDropdown from "./UserDropdown";
import { useAppSelector } from "@/lib/store/reduxHooks";
import SideNavbarLogo from "./SideNavbarLogo";

const SideNavbar = () => {
  const isNavbarCollapsed = useAppSelector(
    (state) => state.sidebar.isCollapsed
  );

  return (
    <nav
      className={`${
        isNavbarCollapsed ? "md:w-16" : "md:w-56"
      } z-[1000] fixed justify-center items-center flex bottom-0 bg-brown text-neutral-200 w-full shrink-0 md:h-full md:flex-col md:pt-4 md:bottom-auto md:justify-between md:items-start`}
    >
      <div className="md:w-full">
        <CollapseNavbarButton />
        <SideNavbarLogo />
        <SideNavbarItems />
      </div>
      <UserDropdown />
    </nav>
  );
};

export default SideNavbar;
