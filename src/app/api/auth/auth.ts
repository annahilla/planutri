import admin from "@/lib/firebase/firebaseAdmin";
import { cookies } from 'next/headers';

export const getUserId = async () => {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session");

        if (!sessionCookie) {
            throw new Error("No session cookie found");
        }

        const decodedToken = await admin.auth().verifySessionCookie(sessionCookie.value, true);
        return decodedToken.uid;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
};
