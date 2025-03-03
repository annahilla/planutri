import connect from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/app/api/auth/auth";
import { FavoriteRecipe } from "@/database/models/favorite-recipes";

export const GET = async () => {
    try {
        const userId = await getUserId();
        await connect();
        const favoriteRecipes = await FavoriteRecipe.find({userId});
        return new NextResponse(JSON.stringify(favoriteRecipes), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error fetching favorite recipes" + error.message, {
            status: 500,
        })
    }
}

export const POST = async (req: NextRequest) => { 
    try {
        const userId = await getUserId();
        await connect();
        const body = await req.json();
        const { recipeId } = body;

        if (!recipeId) {
            return new NextResponse("Recipe is needed", { status: 400 });
        }

        let favoriteRecipe = await FavoriteRecipe.findOne({ userId });

        if (!favoriteRecipe) {
            favoriteRecipe = new FavoriteRecipe({
                userId,
                recipeIds: [recipeId]
            });
        } else {
            if (!favoriteRecipe.recipeIds.includes(recipeId)) {
                favoriteRecipe.recipeIds.push(recipeId);
            }
        }

        await favoriteRecipe.save();
        return new NextResponse(JSON.stringify(favoriteRecipe), { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error adding recipe to favorites:", error); 
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};