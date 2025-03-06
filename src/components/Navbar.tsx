"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useUser } from "@/context/UserContext";
import { IoMdArrowForward } from "react-icons/io";
import Button from "./ui/buttons/Button";
import { logoutUser } from "@/services/authService";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
  };

  return (
    <nav className="flex justify-between items-center mx-6 my-6 text-white md:mx-10 lg:mx-20">
      <Link href={"/"} className="text-2xl">
        <Logo color="white" />
      </Link>
      <div className="flex gap-10 font-normal">
        {isLoggedIn ? (
          <>
            <Link
              className="flex gap-1 items-center px-3 py-2 border-neutral-600 hover:opacity-70 w-full whitespace-nowrap"
              href={"/dashboard/menu"}
            >
              <IoMdArrowForward />
              Go to dashboard
            </Link>
            <div className="hidden md:block">
              <Button handleClick={handleLogout} color="white">
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <Link
              href={"/login"}
              className="px-3 py-2 border-neutral-600 hover:opacity-70 border border-white md:border-0"
            >
              Log In
            </Link>
            <Link
              href={"/signup"}
              className="hidden border px-3 py-2 border-white hover:opacity-70 md:block"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
