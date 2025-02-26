import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { parse } from "cookie";

export async function GET(req: NextRequest) {
  const cookies = parse(req.headers.get("cookie") || "");
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    return new NextResponse(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    return new NextResponse(JSON.stringify({ user: decodedClaims }), { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "Invalid session" }), { status: 401 });
  }
}
