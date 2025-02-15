import connect from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../(utils)/auth";
import ShoppingList from "@/database/models/shopping-list";
import { shoppingService } from "./shoppingService";

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