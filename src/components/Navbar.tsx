import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center mx-10 my-6">
            <Link href={"/"} className="text-xl tracking-widest font-normal">plantry</Link>
            <div className="flex gap-10 font-normal">
                <Link href={"/login"} className="px-3 py-2 text-neutral-600 border-neutral-600">Log In</Link>
                <Link href={"/signup"} className="border px-3 py-2 text-neutral-600 border-neutral-500">Sign Up</Link>
            </div>
        </nav>
    )
}

export default Navbar;