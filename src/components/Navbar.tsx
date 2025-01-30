import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center mx-6 my-6 text-white md:mx-10 lg:mx-20">
      <Link href={"/"} className="text-2xl">
        <Logo color="white" />
      </Link>
      <div className="flex gap-10 font-normal">
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
      </div>
    </nav>
  );
};

export default Navbar;
