import connect from "@/database/db";
import Recipe from "@/database/models/recipes";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const recipes = await Recipe.find();
        return new NextResponse(JSON.stringify(recipes), { status: 200 });
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

export const DELETE = async (req: Request) => {
    try {
        await connect();
        const { id } = await req.json();

        if (!id) {
            return new NextResponse("Recipe ID is required", { status: 400 });
        }

        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return new NextResponse("Recipe not found", { status: 404 });
        }

        return new NextResponse("Recipe deleted successfully", { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error deleting recipe:", error);
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};
