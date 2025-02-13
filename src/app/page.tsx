import Navbar from "@/components/Navbar";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="z-[10] fixed w-full">
        <Navbar />
      </div>
      <div className="h-screen relative">
        <Image className="object-cover" src="/hero.jpg" alt="pantry" fill />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="mx-6 absolute top-1/2 transform -translate-y-1/2 flex flex-col gap-8 md:mx-10 lg:mx-20">
          <p className="text-white text-3xl font-bold text-center tracking-widest md:text-4xl">
            Plan your meals and fill your larder
          </p>
          <div className="w-40 m-auto lg:m-0">
            <Link href={"/signup"}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
