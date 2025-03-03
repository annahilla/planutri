import { getUserId } from "@/app/api/auth/auth";
import connect from "@/database/db";
import { FavoriteRecipe } from "@/database/models/favorite-recipes";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, context: { params: Promise<{ id: string }>}) => {
    try {
        const userId = await getUserId();
        await connect();
        const recipeId = (await context.params).id;

        if (!recipeId) {
            return new NextResponse("Recipe ID is required", { status: 400 });
        }

        const updatedFavorite = await FavoriteRecipe.findOneAndUpdate(
            { userId }, 
            { $pull: { recipeIds: recipeId } }, 
            { new: true }
        );

        if (!updatedFavorite) {
            return new NextResponse("Recipe not found or already removed", { status: 404 });
        }

        return new NextResponse("Favorite recipe deleted successfully", { status: 200 });
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error deleting favorite recipe:", error);
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};
