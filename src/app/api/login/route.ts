import admin from "@/lib/firebase/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const POST = async (req: NextRequest) => {
    try{
        const { idToken } = await req.json();
        if (!idToken) {
            return new NextResponse(JSON.stringify({error: "ID token required"}), { status: 400 });
        }

        await admin.auth().verifyIdToken(idToken);
        const expiresIn = 60 * 60 * 24 * 7 * 1000;
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

        const cookieStore = await cookies();

        const isProduction = process.env.NODE_ENV === "production";
        
        cookieStore.set("session", sessionCookie, {
            secure: isProduction,
            httpOnly: true,
            sameSite: "strict",
            maxAge: expiresIn / 1000,
            path: "/",
        });

        console.log("Generated session cookie:", sessionCookie);


        return new NextResponse(JSON.stringify({message: "Logged In"}), { status: 200 });
    } catch (error) {
        console.error("Session login error:", error);
        return new NextResponse(JSON.stringify({error: "Session login error"}), { status: 401 });
    }
}
