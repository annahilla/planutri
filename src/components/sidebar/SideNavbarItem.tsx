import { useAppSelector } from "@/lib/store/reduxHooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

const SideNavbarItem = ({
  href,
  name,
  icon,
}: {
  href: string;
  name: string;
  icon: ReactElement;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  const isNavbarCollapsed = useAppSelector(
    (state) => state.sidebar.isCollapsed
  );

  return (
    <li className="flex-1">
      <Link
        href={`${href}`}
        className={`py-4 px-5 h-16 flex items-center cursor-pointer ${
          isNavbarCollapsed ? "justify-center" : "gap-3"
        } ${
          isActive ? "bg-lightBrown hover:opacity-65" : "hover:bg-lightBrown"
        }`}
      >
        {icon}
        <p className={`${isNavbarCollapsed ? "hidden" : "hidden md:block"}`}>
          {name}
        </p>
      </Link>
    </li>
  );
};

export default SideNavbarItem;
