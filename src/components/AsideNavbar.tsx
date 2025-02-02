"use client";

import { useAppSelector } from "@/lib/store/reduxHooks";
import Logo from "./Logo";
import { CiBoxList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { PiNotebookLight } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import AsideNavbarItem from "./ui/AsideNavbarItem";
import Link from "next/link";

const AsideNavbar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <nav className="fixed justify-center items-center flex bottom-0 bg-neutral-50 shrink-0 w-full md:h-full md:w-64 md:flex-col md:pt-4 md:bottom-auto md:justify-between md:items-start">
      <div className="md:w-full">
        <Link href={"/"} className="align-self-center hidden md:block">
          <Logo color="black" />
        </Link>
        <ul className="flex text-neutral-500 w-full md:flex-col md:my-10">
          <AsideNavbarItem
            name="Menu"
            href="/dashboard"
            icon={<CiCalendar />}
          />
          <AsideNavbarItem
            name="Recipes"
            href="/dashboard/recipes"
            icon={<PiNotebookLight />}
          />
          <AsideNavbarItem
            name="Create Recipe"
            href="/dashboard/create-recipe"
            icon={<IoCreateOutline />}
          />
          <AsideNavbarItem
            name="Shopping List"
            href="/dashboard/shopping-list"
            icon={<CiBoxList />}
          />
        </ul>
      </div>
      <div className="flex gap-3 items-center px-5 py-5 w-full text-neutral-500 cursor-pointer hover:bg-neutral-100">
        <CiUser className="md:text-3xl" />
        <div>
          <p className="text-sm hidden md:block">
            {user && user.name ? user.name : ""}
          </p>
          <p className="text-xs hidden md:block">
            {user ? user.email : "User"}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default AsideNavbar;
