import { FavoriteRecipe } from "@/database/models/favorite-recipes";
import Recipe from "@/database/models/recipes";
import { Types } from "mongoose";

interface Filters {
    search: string;
    meal: string;
    filters: string[]
    skip: number;
    sort: string;
    limit: number;
    userId: string;
}

export class RecipeService {

    async getRecipesFromDB({
        search,
        meal,
        filters,
        skip,
        sort = "alphabetical",
        limit,
        userId
    }: Filters) {
        const query: any = { $or: [{ userId }, { isPublic: true }] };
        if (search) query.name = { $regex: search, $options: "i" };
        if (meal) query.meals = { $in: [meal] };
        
        if (filters.includes("public")) {
            query.isPublic = true;
        }
        if (filters.includes("owned")) {
            query.userId = userId;
        }

        if (filters.includes("favorites")) {
            const favoriteRecipes = await FavoriteRecipe.findOne({ userId }).select("recipeIds");

            if (!favoriteRecipes || !favoriteRecipes.recipeIds.length) {
                return [];
            }

            const favoriteIds = favoriteRecipes.recipeIds.map((id: Types.ObjectId)=> new Types.ObjectId(id));
            query._id = { $in: favoriteIds };
        }

        let sortField: { [key: string]: 1 | -1 } = {};
        if (sort === "newest") {
            sortField = { createdAt: -1 };
        } else if (sort === "oldest") {
            sortField = { createdAt: 1 };
        } else if (sort === "alphabetical") {
            sortField = { name: 1 }; 
        }


        const recipes = await Recipe.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sortField) 
            .exec();

        return recipes;
    };

    async getTotalRecipesCount({ search, meal, type, userId }: { search: string; meal: string; type: string, userId: string }) {
         const query: any = { $or: [{ userId }, { isPublic: true }] };
        if (search) query.name = { $regex: search, $options: "i" };
        if (meal) query.meals = { $in: [meal] };
        if (type) query.type = type;

        const count = await Recipe.countDocuments(query);
        return count;
    };
}