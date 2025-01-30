"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Button from "./Button";

const AuthForm = ({ type }: { type: "Sign Up" | "Log In" }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const inputStyles = "px-5 py-3 outline-none border border-neutral-300 placeholder:font-light";


    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    
        try {
          if (type === "Log In") {
            await signInWithEmailAndPassword(auth, email, password);
          } else {
            await createUserWithEmailAndPassword(auth, email, password);
          }
        } catch (err: any) {
          setError(err.message);
        }
      };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="border border-neutra-700 px-10 py-16 flex flex-col items-center justify-center max-w-80">
                <Link href={"/"} className="text-3xl tracking-widest font-normal mb-6">plantry</Link>
                <p className="text-sm text-neutral-500 text-center">{type} now to start planning your meals</p>
                <form onSubmit={handleAuth} className="flex flex-col gap-4 items-center justify-center mt-8">
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
                    <div className="mt-4">
                        <Button>
                            {type}
                        </Button>
                    </div>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    )
}

export default AuthForm;