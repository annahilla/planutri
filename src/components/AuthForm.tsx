"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./ui/Button";
import Logo from "./Logo";
import GoogleButton from "./ui/GoogleButton";
import { loginUser, signUpUser } from "@/lib/store/auth/authActions";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { useRouter } from "next/navigation";

const AuthForm = ({ formType }: { formType: "Sign Up" | "Log In" }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputStyles =
    "px-5 py-3 outline-none border border-neutral-300 w-full placeholder:font-light";

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formType === "Log In") {
        await dispatch(loginUser({ email, password })).unwrap();
      } else {
        await dispatch(signUpUser({ email, password })).unwrap();
        await dispatch(loginUser({ email, password })).unwrap();
      }
      router.push("/dashboard/menu");
    } catch (err) {
      console.error("Error during authentication:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="px-10 py-16 flex flex-col items-center justify-center w-80 border border-neutral-700">
        <Link href={"/"} className="text-3xl mb-8">
          <Logo color="black" />
        </Link>
        <p className="text-sm text-neutral-500 text-center">
          {formType} now to start planning your meals
        </p>
        <form
          onSubmit={handleAuth}
          className="flex flex-col gap-4 items-center w-64 justify-center mt-8"
        >
          <input
            className={inputStyles}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={inputStyles}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mt-4 flex flex-col gap-4 w-full">
            <GoogleButton />
            <Button type="submit" filled>
              {formType}
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4 text-xs">{error}</p>}
        <div className="mt-4 text-sm">
          {formType === "Log In" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link
                className="text-neutral-500 hover:underline"
                href={"/signup"}
              >
                Sign Up here
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                className="text-neutral-500 hover:underline"
                href={"/login"}
              >
                Log In here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
