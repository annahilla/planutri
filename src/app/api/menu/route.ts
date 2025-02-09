import { verifyToken } from "@/lib/auth";
import connect from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import Menu from "@/database/models/menu";

export const GET = async (req: NextRequest) => {
    try {
        const userId = await verifyToken(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connect();
        const menus = await Menu.find({ userId: userId });
        return new NextResponse(JSON.stringify(menus), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return new NextResponse("Error fetching menu" + error.message, {
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
        const body = await req.json();
        const { recipe, dayOfTheWeek, meal } = body;

        if (!recipe || !dayOfTheWeek || !meal) {
            return new NextResponse("Required fields are missing", { status: 400 });
        }

        const newMenu = new Menu({
            recipe,
            dayOfTheWeek,
            meal,
            userId
        });

        await newMenu.save();

        return new NextResponse(JSON.stringify(newMenu), { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error creating recipe:", error); 
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};