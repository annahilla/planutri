import admin from "@/lib/firebase/firebaseAdmin";
import { parse } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const cookies = parse(req.headers.get("cookie") || "");
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    return new NextResponse(JSON.stringify({ error: "No session cookie" }), { status: 401 });
  }

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    return new NextResponse(JSON.stringify(decodedClaims), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({error: "Invalid session cookie"}), { status: 401 });
  }
}
