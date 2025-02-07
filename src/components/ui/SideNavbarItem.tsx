import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

const SideNavbarItem = ({
  href,
  name,
  icon,
  collapsedStyles,
}: {
  href: string;
  name: string;
  icon: ReactElement;
  collapsedStyles: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <li className="flex-1">
      <Link
        href={`${href}`}
        className={`py-4 px-5 h-16 flex items-center cursor-pointer ${
          collapsedStyles ? "justify-center" : "gap-3"
        } ${
          isActive ? "bg-neutral-100 hover:opacity-65" : "hover:bg-neutral-100"
        }`}
      >
        {icon}
        <p className={`${collapsedStyles ? "hidden" : "hidden md:block"}`}>
          {name}
        </p>
      </Link>
    </li>
  );
};

export default SideNavbarItem;
