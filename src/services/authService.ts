import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export async function login(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const idToken = await user.getIdToken();

        const response = await fetch("/api/login", {
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

export async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        const idToken = await user.getIdToken();

        const response = await fetch("/api/login", {
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
        const response = await fetch("/api/logout", {method: "POST"});
        if (!response.ok) throw new Error("Log out error");
        return response;
    } catch(error) {
        console.error("Logout error: ", error)
    }
}