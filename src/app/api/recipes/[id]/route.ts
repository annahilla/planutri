import connect from "@/lib/database/db";
import Recipe from "@/lib/database/models/recipes";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await connect();

        const recipe = await Recipe.findById(params.id);
        if (!recipe) {
            return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json(recipe, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({ message: "Error fetching recipe: " + error.message }, { status: 500 });
    }
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await connect();
        const body = await req.json();
        const { name, ingredients, description } = body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            params.id,
            { name, ingredients, description },
            { new: true }
        );

        if (!updatedRecipe) {
            return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json(updatedRecipe, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error updating recipe:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
