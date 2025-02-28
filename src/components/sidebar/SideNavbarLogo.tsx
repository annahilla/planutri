"use client";

import Link from "next/link";
import Logo from "../Logo";
import useSidebarState from "@/hooks/useSidebarState";

const SideNavbarLogo = () => {
  const { isCollapsed } = useSidebarState();

  return (
    <Link
      href={"/"}
      className="flex justify-center text-white m-auto text-2xl w-fit hidden md:block"
    >
      {isCollapsed ? <Logo color="white" minified /> : <Logo color="white" />}
    </Link>
  );
};

export default SideNavbarLogo;
