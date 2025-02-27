import connect from "@/database/db";
import Menu from "@/database/models/menu";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../../auth/auth";

export const DELETE = async (req: NextRequest, context: { params: Promise<{ id: string }>}) => {
    try {
        const userId = await getUserId();
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("User id: ", userId);

        await connect();
        const id = (await context.params).id;

        const menu = await Menu.findById(id);

        if (!menu) {
            return new NextResponse("Menu is required", { status: 400 });
        }

        if (menu.userId.toString() !== userId.toString()) {
            return new NextResponse("Unauthorized: You can only delete your own menus", { status: 403 });
        }

        await Menu.findByIdAndDelete(id);

        return new NextResponse("Menu deleted successfully", { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error deleting menu:", error);
        return new NextResponse(JSON.stringify({ message: error.message, stack: error.stack }), {
            status: 500,
        });
    }
};