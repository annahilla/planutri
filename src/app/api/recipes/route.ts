import connect from "@/database/db";
import Recipe from "@/database/models/recipes";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../auth/auth";
import { ImageService } from "./ImageService";
import { RecipeService } from "./RecipeService";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);

        const page = searchParams.get("page") ? parseInt(searchParams.get("page") || "1", 10) : 1;
        const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") || "12", 10) : 12;
        const skip = (page - 1) * limit;
        const searchQuery = searchParams.get("search") || "";
        const mealFilter = searchParams.get("meal") || "";
        const filters = (searchParams.get("filter")?.split(",") as string[]) || [];
        const sort = searchParams.get("sort") || "";

        const userId = await getUserId();
        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }),
                { status: 401 }
            );
        }

        await connect();
        const recipeService = new RecipeService();

        const recipes = await recipeService.getRecipesFromDB({
            search: searchQuery,
            meal: mealFilter,
            filters,
            skip,
            sort,
            limit,
            userId,
        });

        const query: any = { userId };

        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: "i" };
        }
        if (mealFilter) {
            query.meals = { $in: [mealFilter] };
        }

        const totalRecipes = await Recipe.countDocuments(query);
        const totalPages = Math.ceil(totalRecipes / limit);

        return new NextResponse(JSON.stringify({ recipes, totalPages }), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: "Error fetching recipes: " + error.message }),
            { status: 500 }
        );
    }
};

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
