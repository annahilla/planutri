import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const response = new NextResponse(JSON.stringify({ message: "Logged out" }), { status: 200 });

    response.headers.delete("sessionCookie");

    return response;
};