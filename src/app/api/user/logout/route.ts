import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return new NextResponse(JSON.stringify({ message: "Logged out" }), { status: 200 });
};