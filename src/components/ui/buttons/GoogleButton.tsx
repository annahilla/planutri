"use client";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { loginWithGoogle } from "@/services/authService";

const GoogleButton = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      router.push("/dashboard/menu");
    } catch (err) {
      console.error("Error during Google sign-in:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-2 border border-neutral-300 p-3 text-sm w-full"
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
