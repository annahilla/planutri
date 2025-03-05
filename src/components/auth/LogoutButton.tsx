"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/buttons/Button";
import { logoutUser } from "@/services/authService";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <Button color="white" filled handleClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
