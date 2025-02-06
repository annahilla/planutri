"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import Logo from "./Logo";
import { CiBoxList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { PiNotebookLight } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import AsideNavbarItem from "./ui/AsideNavbarItem";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { logoutUser } from "@/lib/store/auth/authActions";
import { useRouter } from "next/navigation";

const AsideNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <nav className="z-[1000] fixed justify-center items-center flex bottom-0 bg-neutral-50 shrink-0 w-full md:w-auto md:h-full md:flex-col md:pt-4 md:bottom-auto md:justify-between md:items-start">
      <div className="md:w-full">
        <Link href={"/"} className="text-2xl align-self-center hidden md:block">
          <Logo color="black" />
        </Link>
        <ul className="flex text-neutral-500 w-full md:flex-col md:my-10">
          <AsideNavbarItem
            name="Menu"
            href="/dashboard/menu"
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
      <div
        onClick={toggleDropdown}
        className="flex flex-col text-neutral-500 cursor-pointer md:w-full"
      >
        {isDropdownOpen && (
          <button
            onClick={handleLogout}
            className="text-sm py-4 pl-9 hidden hover:opacity-75 md:block"
          >
            <div className="flex items-center gap-1">
              <CiLogout />
              Log Out
            </div>
          </button>
        )}
        <div className="flex gap-3 items-center justify-center hover:bg-neutral-100 px-5 py-4 md:py-5 md:justify-start">
          <CiUser className="md:text-3xl" />
          <div className="hidden md:block">
            <div className="text-sm">{user && user.name ? user.name : ""}</div>
            <div className="text-xs">{user ? user.email : "User"}</div>
          </div>
          <div className="hidden md:block">
            {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AsideNavbar;
