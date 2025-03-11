import connect from "@/database/db";
import Recipe from "@/database/models/recipes";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../auth/auth";
import { ImageService } from "./ImageService";

export const GET = async () => {
    try {
        const userId = await getUserId();
        await connect();
        const recipes = await Recipe.find({$or: [{ userId: userId }, { isPublic: true }]});
        return new NextResponse(JSON.stringify(recipes), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error fetching ingredients" + error.message, {
            status: 500,
        })
    }
}

export const POST = async (req: NextRequest) => { 
    try {
        const userId = await getUserId();
        await connect();
        const body = await req.json();
        const { name, ingredients, description, servings, isPublic, meals } = body;

        if (!name || !ingredients || ingredients.length === 0 || meals.length === 0) {
            return new NextResponse("Required fields are missing", { status: 400 });
        }
        
        const imgService = new ImageService();
        const imageUrl = await imgService.generateImage(name);

        const newRecipe = new Recipe({
            name,
            ingredients,
            description,
            userId,
            servings,
            meals,
            isPublic: isPublic ?? false,
            imageUrl
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

export const DELETE = async (req: NextRequest) => {
    try {
        const userId = await getUserId();
        await connect();
        const { id } = await req.json();

        if (!id) {
            return new NextResponse("Recipe ID is required", { status: 400 });
        }

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return new NextResponse("Recipe not found", { status: 404 });
        }

        if (recipe.userId !== userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await Recipe.findByIdAndDelete(id);

        return new NextResponse("Recipe deleted successfully", { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error deleting recipe:", error);
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};
