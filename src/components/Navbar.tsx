"use client";

import Link from "next/link";
import Logo from "./Logo";
import { getUser, logoutUser } from "@/services/authService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "./ui/buttons/Button";
import { IoMdArrowForward } from "react-icons/io";

const Navbar = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const logout = async () => {
    await logoutUser();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  return (
    <nav className="flex justify-between items-center mx-6 my-6 text-white md:mx-10 lg:mx-20">
      <Link href={"/"} className="text-2xl">
        <Logo color="white" />
      </Link>
      <div className="flex gap-10 font-normal">
        {isLoading ? (
          <p>{""}</p>
        ) : user ? (
          <>
            <Link
              className="flex gap-1 items-center px-3 py-2 border-neutral-600 hover:opacity-70 w-full whitespace-nowrap"
              href={"/dashboard/menu"}
            >
              <IoMdArrowForward />
              Go to dashboard
            </Link>
            <div className="hidden md:block">
              <Button handleClick={logout} color="white">
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
