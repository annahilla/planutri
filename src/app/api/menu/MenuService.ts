import Menu from "@/database/models/menu";
import Recipe from "@/database/models/recipes";

export class MenuService {
    async getRecipesFromMenu(userId: string) {
        try {
            const menus = await Menu.find({ userId });
            const recipeIds = menus.map(menu => menu.recipe); 

            const recipes = await Recipe.findOne({ userId }).select({ '_id': { $in: recipeIds } });

            console.log(recipes);

            return recipes;  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new Error("Error fetching recipes from menu: " + error.message);
        }
    }
}