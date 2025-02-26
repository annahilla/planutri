import admin from "@/lib/firebase/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    try{
        const { idToken } = await req.json();
        if (!idToken) {
            return new NextResponse(JSON.stringify({error: "ID token required"}), { status: 400 });
        }

        await admin.auth().verifyIdToken(idToken);
        const expiresIn = 60 * 60 * 24 * 7 * 1000;
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

        const res = new NextResponse(JSON.stringify({message: "Logged In"}), { status: 200 });
         res.headers.append(
            "Set-Cookie",
            `session=${sessionCookie}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${expiresIn / 1000}`
        );
        return res;
    } catch (error) {
        console.error("Session login error:", error);
        return new NextResponse(JSON.stringify({error: "Session login error"}), { status: 401 });
    }
}
