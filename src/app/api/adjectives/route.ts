import connect from "@/database/db";
import Adjective from "@/database/models/adjectives";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const adjectives = await Adjective.find();
        return new NextResponse(JSON.stringify(adjectives));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error fetching ingredients" + error.message, {
            status: 500,
        })
    }
}