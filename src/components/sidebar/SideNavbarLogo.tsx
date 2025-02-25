"use client";

import Link from "next/link";
import Logo from "../Logo";
import { useAppSelector } from "@/lib/store/reduxHooks";

const SideNavbarLogo = () => {
  const isNavbarCollapsed = useAppSelector(
    (state) => state.sidebar.isCollapsed
  );

  return (
    <Link
      href={"/"}
      className="flex justify-center text-white m-auto text-2xl w-fit hidden md:block"
    >
      {isNavbarCollapsed ? (
        <Logo color="white" minified />
      ) : (
        <Logo color="white" />
      )}
    </Link>
  );
};

export default SideNavbarLogo;
