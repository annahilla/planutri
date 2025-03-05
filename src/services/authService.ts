import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { AuthUser } from "@/types/types";
import { toast } from "react-toastify";

export async function loginUser(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const idToken = await user.getIdToken();

        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) throw new Error("Login error");

        await auth.signOut();

        window.location.assign("/dashboard/menu");
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function signUpUser(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        const userData: AuthUser = { email: user.email!,  token: idToken  };

        const response = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, idToken }),
        });

        if (!response.ok) throw new Error("Login error");


        return userData;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        const idToken = await user.getIdToken();

        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) throw new Error("Login error");


        await auth.signOut();
        window.location.assign("/dashboard/menu");
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function logoutUser() {
    try {
        const response = await fetch("/api/user/logout", {method: "POST"});
        if (!response.ok) throw new Error("Log out error");
        return response;
    } catch(error) {
        console.error("Logout error: ", error)
    }
}

export async function getUser() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();
    return data.user as AuthUser;
}

export async function updateUser(user: {name: string, username: string}) {
    try {
        const response = await fetch("/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...user }),
        });
    
        if (!response.ok) {
          toast.error("There was an error updating user");
          throw new Error("Error updating user");
        }
    
        const updatedRecipe = await response.json();
        toast.success("User updated successfully");
        return updatedRecipe;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
}