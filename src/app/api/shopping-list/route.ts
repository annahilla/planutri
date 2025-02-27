import connect from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import ShoppingList from "@/database/models/shopping-list";
import { shoppingService } from "./shoppingService";
import { getUserId } from "../auth/auth";

export const GET = async (req: NextRequest) => {
    try {
        const userId = await getUserId();

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
        const userId = await getUserId();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const shoppingListService = new shoppingService();
        const shoppingList = await shoppingListService.generateShoppingList(userId);

        return new NextResponse(JSON.stringify(shoppingList), { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error generating shopping list:", error); 
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const userId = await getUserId();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { ingredient, checked } = body;

        const shoppingListService = new shoppingService();
        const updatedShoppingList = await shoppingListService.updateShoppingList(userId, ingredient, checked);

        return new NextResponse(JSON.stringify(updatedShoppingList), { status: 201 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error generating shopping list:", error); 
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const userId = await getUserId();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connect();

        const result = await ShoppingList.deleteMany({ userId });

        if (result.deletedCount === 0) {
            return new NextResponse("No shopping list found to delete", { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "Shopping List deleted successfully", deletedCount: result.deletedCount }), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error deleting recipe:", error);
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
}