import admin from "@/lib/firebase/firebaseAdmin";
import { parse } from "cookie";
import { NextRequest } from "next/server";

export async function getServerSession(req: NextRequest) {
    try {
        const cookies = parse(req.headers.get("cookie") || "");
        const session = cookies.session;

        if (!session) return null;

        return await admin.auth().verifySessionCookie(session, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return null;
    }
}
