import connect from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../(utils)/auth";
import ShoppingList from "@/database/models/shopping-list";
import Menu from "@/database/models/menu";
import Recipe from "@/database/models/recipes";
import { IngredientInterface } from "@/types/types";

export const GET = async (req: NextRequest) => {
    try {
        const userId = await verifyToken(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connect();
        const shoppingList = await ShoppingList.find({ userId: userId });
        return new NextResponse(JSON.stringify(shoppingList), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error fetching ingredients" + error.message, {
            status: 500,
        })
    }
}

export const POST = async (req: NextRequest) => { 
    try {
        const userId = await verifyToken(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connect();
        const weeklyMenu = await Menu.find({ userId: userId });

        if (!weeklyMenu || weeklyMenu.length === 0) {
            return new NextResponse("No menus found", { status: 404 });
        }

        const recipeIds = weeklyMenu.map(menu => menu.recipe);
        const recipes = await Recipe.find({ _id: { $in: recipeIds } });

        if (!recipes || recipes.length === 0) {
            return new NextResponse("No recipes found", { status: 404 });
        }

        let shoppingList: IngredientInterface[] = [];
        recipes.forEach(recipe => {
            shoppingList = [...shoppingList, ...recipe.ingredients];
        });

        return new NextResponse(JSON.stringify(shoppingList), { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error creating recipe:", error); 
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};