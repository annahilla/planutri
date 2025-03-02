import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard"];
  const pathname = req.nextUrl.pathname;
  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path));

  if (!requiresAuth) {
    return handleCORS(NextResponse.next(), req);
  }

  const cookies = parse(req.headers.get("cookie") || "");
  const sessionCookie = cookies.session;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const res = await fetch(`${req.nextUrl.origin}/api/auth/checkAuth`, {
    method: "GET",
    headers: {
      "Cookie": `session=${sessionCookie}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return handleCORS(NextResponse.next(), req);
}

function handleCORS(response: NextResponse, req: NextRequest) {
  const allowedOrigin = "https://planutri.vercel.app";

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  response.headers.set("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: response.headers });
  }

  return response;
}

export const config = {
    matcher: ["/api/:path*", "/dashboard/:path*"],
};
