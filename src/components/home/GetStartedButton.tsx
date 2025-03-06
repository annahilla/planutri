"use client";

import { useUser } from "@/context/UserContext";
import Button from "../ui/buttons/Button";
import Link from "next/link";

const GetStartedButton = () => {
  const { user } = useUser();

  return (
    <Link href={user ? "/dashboard/menu" : "/signup"}>
      <Button color="white">Get Started</Button>
    </Link>
  );
};

export default GetStartedButton;
