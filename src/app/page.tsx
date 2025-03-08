import Navbar from "@/components/Navbar";
import Image from "next/image";
import GetStartedButton from "@/components/home/GetStartedButton";
import { isAuthenticated } from "@/services/userService";

export default async function Home() {
  const isLoggedIn = await isAuthenticated();
  return (
    <>
      <div className="z-[10] fixed w-full">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      <div className="h-screen relative">
        <Image className="object-cover" src="/hero.jpg" alt="pantry" fill />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="mx-6 absolute top-1/2 transform -translate-y-1/2 flex flex-col gap-8 md:mx-10 lg:mx-20">
          <p className="text-white text-3xl font-bold text-center tracking-widest md:text-4xl">
            Plan your meals and fill your pantry
          </p>
          <div className="w-40 m-auto lg:m-0">
            <GetStartedButton />
          </div>
        </div>
      </div>
    </>
  );
}
