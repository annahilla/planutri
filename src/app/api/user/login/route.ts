import admin from "@/lib/firebase/firebaseAdmin";
import connect from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { User } from "@/database/models/user";
import { usernameService } from "../usernameService";

export const POST = async (req: NextRequest) => {
    try{
        const { idToken } = await req.json();
        await connect();

        if (!idToken) {
            return new NextResponse(JSON.stringify({error: "ID token required"}), { status: 400 });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const userId = decodedToken.uid;

        let user = await User.findOne({ userId });

        if (!user) {
            const userService = new usernameService();
            const username = await userService.generateUsername();
            user = new User({
                firebaseUid: idToken,
                name: decodedToken.name,
                email: decodedToken.email,
                username,
                picture: decodedToken.picture,
                userId,
            });

            await user.save();
        }

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

        return new NextResponse(JSON.stringify({message: "Logged In"}), { status: 200 });
    } catch (error) {
        console.error("Session login error:", error);
        return new NextResponse(JSON.stringify({error: "Session login error"}), { status: 401 });
    }
}
