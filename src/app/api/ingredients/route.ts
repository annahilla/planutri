import connect from "@/database/db";
import Ingredient from "@/database/models/ingredients";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const ingredients = await Ingredient.find();
        return new NextResponse(JSON.stringify(ingredients));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error fetching ingredients" + error.message, {
            status: 500,
        })
    }
}