import connect from "@/lib/database/db";
import Recipe from "@/lib/database/models/recipes";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const recipes = await Recipe.find();
        return new NextResponse(JSON.stringify(recipes));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error fetching ingredients" + error.message, {
            status: 500,
        })
    }
}

export const POST = async (req: Request) => {
    try {
        await connect();
        const body = await req.json();
        const { name, ingredients, description } = body;

        if (!name || !ingredients || ingredients.length === 0) {
            return new NextResponse("Required fields are missing", { status: 400 });
        }

        const newRecipe = new Recipe({
            name,
            ingredients,
            description,
        });

        await newRecipe.save();

        return new NextResponse(JSON.stringify(newRecipe), { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error creating recipe:", error); 
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};
