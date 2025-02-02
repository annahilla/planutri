"use client";

import { useAppSelector } from "@/lib/hooks";
import Logo from "./Logo";
import { CiBoxList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { PiNotebookLight } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import AsideNavbarItem from "./ui/AsideNavbarItem";

const AsideNavbar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <nav className="fixed justify-center items-center flex bottom-0 bg-neutral-50 shrink-0 w-full md:h-full md:w-64 md:flex-col md:py-4 md:bottom-auto md:justify-between md:items-start">
      <div className="md:w-full">
        <div className="align-self-center hidden md:block">
          <Logo color="black" />
        </div>
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
      <div className="flex gap-3 items-center px-5 my-4 text-neutral-500">
        <CiUser className="md:text-3xl" />
        <p className="hidden md:block">{user ? user.email : "User"}</p>
      </div>
    </nav>
  );
};

export default AsideNavbar;
