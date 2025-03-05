import connect from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/database/models/user";
import { getUserId } from "@/app/api/auth/auth";
import Recipe from "@/database/models/recipes";

export const GET = async (req: NextRequest, { params } : { params: Promise<{ id: string }>}) => {
    try {
        await getUserId();
        await connect();
        const { id } = await params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
        }

        const userId = recipe.userId;

        const user = await User.findOne({ userId });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify({ username: user.username }), { status: 200 });
    } catch (error) {
        console.error("Error getting username:", error);
        return new NextResponse("Error fetching username", { status: 500 });
    }
};
