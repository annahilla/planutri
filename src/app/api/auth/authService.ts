import admin from "@/lib/firebase/firebaseAdmin";
import { NextRequest } from "next/server";
import { parse } from "cookie";

export async function getServerSession(req: NextRequest) {
    try {
         const cookies = parse(req.headers.get("cookie") || "");
        const sessionCookie = cookies.session;
        if (!sessionCookie) {
            return null;
        }
        return await admin.auth().verifySessionCookie(sessionCookie, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return null;
    }
}
