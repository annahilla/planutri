"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import Logo from "./Logo";
import {
  CiCalendar,
  CiUser,
  CiLogout,
  CiSettings,
  CiViewList,
  CiShoppingBasket,
  CiSquarePlus,
} from "react-icons/ci";
import Link from "next/link";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useRef, useState } from "react";
import { logoutUser } from "@/lib/store/auth/authActions";
import { useRouter } from "next/navigation";
import SideNavbarItem from "./ui/SideNavbarItem";
import { PiSidebarSimpleLight } from "react-icons/pi";

import useClickOutside from "@/hooks/useClickOutside";

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
  const dropdownRef = useRef<HTMLDivElement>(null!);
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

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

  const handleUserClick = () => {
    if (window.innerWidth < 768) {
      router.push("/dashboard/profile");
    } else {
      toggleDropdown();
    }
  };

  return (
    <nav
      className={`${
        isNavbarCollapsed ? "md:w-16" : "md:w-56"
      } z-[1000] fixed justify-center items-center flex bottom-0 bg-brown text-neutral-200 w-full shrink-0 md:h-full md:flex-col md:pt-4 md:bottom-auto md:justify-between md:items-start`}
    >
      <div className="md:w-full">
        <button
          onClick={toggleNavbar}
          type="button"
          className={`${
            isNavbarCollapsed ? "justify-center mb-6" : "justify-end"
          } mb-2 w-full px-3 hover:opacity-70 hidden outline-none md:flex`}
        >
          <PiSidebarSimpleLight />
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
            name="Meal Planner"
            href="/dashboard/menu"
            icon={<CiCalendar size={22} />}
            collapsedStyles={isNavbarCollapsed}
          />
          <SideNavbarItem
            name="Shopping List"
            href="/dashboard/shopping-list"
            icon={<CiShoppingBasket size={22} />}
            collapsedStyles={isNavbarCollapsed}
          />
          <SideNavbarItem
            name="Recipes"
            href="/dashboard/recipes"
            icon={<CiViewList size={22} />}
            collapsedStyles={isNavbarCollapsed}
          />

          <SideNavbarItem
            name="Create Recipe"
            href="/dashboard/create-recipe"
            icon={<CiSquarePlus size={22} />}
            collapsedStyles={isNavbarCollapsed}
          />
        </ul>
      </div>
      <div
        onClick={handleUserClick}
        ref={dropdownRef}
        className="relative flex flex-col cursor-pointer min-h-16 justify-center md:w-full"
      >
        {isDropdownOpen && (
          <div
            className={`${
              isNavbarCollapsed ? "m-auto" : "pl-2"
            } flex-col items-center justify-center gap-5 mb-4 hidden md:flex`}
          >
            <Link
              href={"/dashboard/profile"}
              className="px-5 hover:opacity-75 w-full"
            >
              <div className="flex items-center h-full gap-1">
                <CiSettings className="text-xl" />
                <p className="hidden md:block text-xs">
                  {!isNavbarCollapsed && "User Settings"}
                </p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 hover:opacity-75 w-full"
            >
              <div className="flex items-center h-full gap-1">
                <CiLogout className="text-xl" />
                <p className="hidden md:block text-xs">
                  {!isNavbarCollapsed && "Log Out"}
                </p>
              </div>
            </button>
          </div>
        )}
        <div className="relative flex gap-2 min-h-16 items-center justify-center hover:bg-lightBrown px-5 py-4 md:px-2 md:py-5 md:justify-between">
          <div className={`${isNavbarCollapsed && "md:ml-2"}`}>
            <CiUser className="text-xl md:text-3xl" />
          </div>
          {!isNavbarCollapsed && (
            <div className="flex flex-1 flex-col gap-1 justify-start hidden md:block">
              <div className="text-sm">
                {user
                  ? user.name
                    ? user.name
                    : user.email?.split("@")[0]
                  : "User"}
              </div>
              <div className="text-xs">{user ? user.email : "User"}</div>
            </div>
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
