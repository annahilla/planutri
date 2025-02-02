import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

const AsideNavbarItem = ({
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

  return (
    <li className="flex-1">
      <Link
        href={`${href}`}
        className={`py-4 px-5 flex gap-3 items-center cursor-pointer ${
          isActive
            ? "bg-neutral-100 hover:bg-neutral-200"
            : "hover:bg-neutral-100"
        }`}
      >
        {icon}
        <p className="hidden md:block">{name}</p>
      </Link>
    </li>
  );
};

export default AsideNavbarItem;
