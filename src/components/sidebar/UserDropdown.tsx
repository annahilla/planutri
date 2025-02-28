"use client";

import useClickOutside from "@/hooks/useClickOutside";
import useSidebarState from "@/hooks/useSidebarState";
import { getUser, logoutUser } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { CiLogout, CiSettings, CiUser } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserDropdown = () => {
  const { isCollapsed } = useSidebarState();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null!);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await logoutUser();
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
    <div
      onClick={handleUserClick}
      ref={dropdownRef}
      className="relative flex flex-col cursor-pointer min-h-16 justify-center md:w-full"
    >
      {isDropdownOpen && (
        <div
          className={`${
            isCollapsed ? "m-auto" : "pl-2"
          } flex-col items-center justify-center gap-5 mb-4 hidden md:flex`}
        >
          <Link
            href={"/dashboard/profile"}
            className="px-5 hover:opacity-75 w-full"
          >
            <div className="flex items-center h-full gap-1">
              <CiSettings className="text-xl" />
              <p className="hidden md:block text-xs">
                {!isCollapsed && "User Settings"}
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
                {!isCollapsed && "Log Out"}
              </p>
            </div>
          </button>
        </div>
      )}
      <div className="relative flex gap-2 min-h-16 items-center justify-center hover:bg-lightBrown px-5 py-4 md:px-2 md:py-5 md:justify-between">
        <div className={`${isCollapsed && "md:ml-2"}`}>
          <CiUser className="text-xl md:text-3xl" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-1 flex-col gap-1 justify-start hidden md:block">
            <div className="text-sm">
              {user ? (
                user.name ? (
                  user.name
                ) : (
                  user.email?.split("@")[0]
                )
              ) : (
                <Skeleton baseColor="#635F53" highlightColor="#76736B" />
              )}
            </div>
            <div className="text-xs">
              {user ? (
                user?.email
              ) : (
                <Skeleton baseColor="#635F53" highlightColor="#76736B" />
              )}
            </div>
          </div>
        )}
        <div
          className={`${
            isCollapsed ? "absolute right-2 top-4 text-xs" : ""
          } hidden md:block`}
        >
          {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
