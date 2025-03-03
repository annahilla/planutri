import connect from "@/database/db";
import Recipe from "@/database/models/recipes";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../../auth/auth";

export const GET = async (req: NextRequest, { params } : { params: Promise<{ id: string }>}) => {
    try {
        await getUserId();
        await connect();
        const { id } = await params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json(recipe, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({ message: "Error fetching recipe: " + error.message, stack: error.stack }, { status: 500 });
    }
};

export const PUT = async (req: NextRequest, { params } : { params: Promise<{ id: string }>}) => {
    try {
        const userId = await getUserId();
        await connect();
        const body = await req.json();
        const { name, ingredients, description, servings, imageUrl } = body;
        const { id } = await params;

        const recipe = await Recipe.findById(id);

        if (!recipe || recipe.userId !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { id, name, ingredients, description, imageUrl, servings, userId },
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
