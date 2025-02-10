"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import Logo from "./Logo";
import { CiBoxList } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { PiNotebookLight } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { logoutUser } from "@/lib/store/auth/authActions";
import { useRouter } from "next/navigation";
import SideNavbarItem from "./ui/SideNavbarItem";
import { BsBoxArrowLeft } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";

interface SideNavbarProps {
  isNavbarCollapsed: boolean;
  setIsNavbarCollapsed: (value: boolean) => void;
}

const SideNavbar = ({
  isNavbarCollapsed,
  setIsNavbarCollapsed,
}: SideNavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <nav className="z-[1000] fixed justify-center items-center flex bottom-0 bg-brown text-neutral-300 shrink-0 w-full md:w-auto md:h-full md:flex-col md:pt-4 md:bottom-auto md:justify-between md:items-start">
      <div className="md:w-full">
        <button
          onClick={toggleNavbar}
          type="button"
          className={`${
            isNavbarCollapsed ? "justify-center mb-6" : "justify-end"
          } mb-2 w-full px-3 hover:opacity-70 hidden outline-none md:flex`}
        >
          {isNavbarCollapsed ? (
            <BsBoxArrowRight size={14} />
          ) : (
            <BsBoxArrowLeft size={14} />
          )}
        </button>
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
        <ul className="flex w-full md:flex-col md:my-10">
          <SideNavbarItem
            name="Meal Plan"
            href="/dashboard/menu"
            icon={<CiCalendar size={22} />}
            collapsedStyles={isNavbarCollapsed}
          />
          <SideNavbarItem
            name="Shopping List"
            href="/dashboard/shopping-list"
            icon={<CiBoxList size={22} />}
            collapsedStyles={isNavbarCollapsed}
          />
          <SideNavbarItem
            name="Recipes"
            href="/dashboard/recipes"
            icon={<PiNotebookLight size={22} />}
            collapsedStyles={isNavbarCollapsed}
          />
          <SideNavbarItem
            name="Create Recipe"
            href="/dashboard/create-recipe"
            icon={<IoCreateOutline size={22} />}
            collapsedStyles={isNavbarCollapsed}
          />
        </ul>
      </div>
      <div
        onClick={toggleDropdown}
        className="flex flex-col cursor-pointer min-h-16 justify-center md:w-full"
      >
        {isDropdownOpen && (
          <button
            onClick={handleLogout}
            className={`${
              isNavbarCollapsed ? "m-auto" : "pl-9"
            } text-sm py-4 px-5 hidden hover:opacity-75 md:block`}
          >
            <div className="flex items-center h-full gap-1">
              <CiLogout size={22} />
              {!isNavbarCollapsed && "Log Out"}
            </div>
          </button>
        )}
        <div className="relative flex gap-3 min-h-16 items-center justify-center hover:bg-lightBrown px-5 py-4 md:py-5 md:justify-start">
          <CiUser className="text-xl md:text-3xl" />
          {!isNavbarCollapsed && (
            <>
              <div className="hidden md:block">
                <div className="text-sm">
                  {user && user.name ? user.name : ""}
                </div>
                <div className="text-xs">{user ? user.email : "User"}</div>
              </div>
            </>
          )}
          <div
            className={`${
              isNavbarCollapsed ? "absolute right-2 top-4 text-xs" : ""
            } hidden md:block`}
          >
            {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
