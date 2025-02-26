import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export async function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard"];
  const pathname = req.nextUrl.pathname;

  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path));

  if (!requiresAuth) {
    return NextResponse.next();
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
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}
