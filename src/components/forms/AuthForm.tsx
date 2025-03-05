"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import Button from "../ui/buttons/Button";
import Logo from "../Logo";
import GoogleButton from "../ui/buttons/GoogleButton";
import { useRouter } from "next/navigation";
import { loginUser, signUpUser } from "@/services/authService";
import { firebaseError, validateUserInput } from "@/utils/validation";
import ErrorMessage from "../ui/ErrorMessage";

const AuthForm = ({ formType }: { formType: "Sign Up" | "Log In" }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const inputStyles =
    "px-5 py-3 outline-none border border-neutral-300 w-full placeholder:font-light";

  const handleChange = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const value = event.target.value;

    if (type === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }

    setError("");
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateUserInput(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (formType === "Log In") {
        await loginUser(email, password);
      } else {
        await signUpUser(email, password);
        await loginUser(email, password);
      }
      router.push("/dashboard/menu");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const authError = firebaseError(err.message);
      setError(authError);
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
          noValidate
          onSubmit={handleAuth}
          className="flex flex-col gap-4 items-center w-64 justify-center mt-8 mb-4"
        >
          <input
            className={inputStyles}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleChange(e, "email")}
            required
          />
          <input
            className={inputStyles}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleChange(e, "password")}
            required
          />
          <div className="mt-4 flex flex-col gap-4 w-full">
            <GoogleButton />
            <Button type="submit" color="white" filled>
              {formType}
            </Button>
          </div>
        </form>
        {error && <ErrorMessage message={error} />}
        <div className="mt-4 text-sm">
          {formType === "Log In" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link
                color="white"
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
