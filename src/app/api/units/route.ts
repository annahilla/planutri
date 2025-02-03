import connect from "@/lib/database/db";
import Unit from "@/lib/database/models/units";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const units = await Unit.find();
        return new NextResponse(JSON.stringify(units));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error fetching ingredients" + error.message, {
            status: 500,
        })
    }
}