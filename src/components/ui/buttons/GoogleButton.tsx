"use client";

import { loginUserWithGoogle } from "@/lib/store/auth/authActions";
import { useAppDispatch } from "@/lib/store/reduxHooks";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const GoogleButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const user = await dispatch(loginUserWithGoogle()).unwrap();
      router.push("/dashboard/menu");
      setCookie("token", user.token, { secure: true, sameSite: "strict" });
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
