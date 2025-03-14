import ShoppingList from '@/database/models/shopping-list';
import connect from "@/database/db";
import Menu from "@/database/models/menu";
import Recipe from "@/database/models/recipes";
import { IngredientInterface, MenuInterface, RecipeInterface } from "@/types/types";
import { NextResponse } from "next/server";

export class ShoppingService {

    async generateShoppingList(userId: string) {
        await connect();
        const menu = await this.getMenu(userId);
        const isMenu = await this.menuExists(menu);

        if(!isMenu){
            await ShoppingList.deleteMany({userId});
            const newShoppingList = new ShoppingList({ userId, list: [] });
            await newShoppingList.save();
        }

        const recipes = await this.getRecipes(menu);
        const isRecipes = await this.recipesExist(recipes);

        if(!isRecipes) {
            return new NextResponse("No recipes found", { status: 404 });
        }

        const existingShoppingList = await ShoppingList.find({ userId: userId });
        const shoppingList = this.getIngredients(menu, recipes);
        const shoppingListIngredientsCalculated = this.sumOfIngredients(shoppingList);

        if(existingShoppingList.length > 0) {
            const existingList = existingShoppingList[0].list;

            const mergedList = shoppingListIngredientsCalculated.map(newItem => {
                const existingItem = existingList.find((item: IngredientInterface) => item.ingredient === newItem.ingredient && item.unit === newItem.unit);
                const checked = existingItem && existingItem.quantity >= newItem.quantity ? existingItem.checked : false;
                return {
                    ...newItem,
                    checked: checked
                }
            })
            const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
                existingShoppingList[0]._id, 
                {list: mergedList}, 
                {new: true}
            );

            return updatedShoppingList;
        }

        const newShoppingList = new ShoppingList({userId, list: shoppingListIngredientsCalculated});
        await newShoppingList.save();

        return shoppingList;
    }

async updateShoppingList(userId: string, ingredientName: string, checked: boolean) {
    const shoppingList = await ShoppingList.findOne({ userId });

    if (!shoppingList) {
        throw new Error("Shopping list not found");
    }

    const ingredientIndex = shoppingList.list.findIndex(
        (item: IngredientInterface) => item.ingredient === ingredientName
    );

    if (ingredientIndex !== -1) {
        shoppingList.list[ingredientIndex].checked = checked;
        await shoppingList.save();
        return shoppingList;
    } else {
        throw new Error("Ingredient not found in the shopping list");
    }
}

    // private async getMenu(userId: string): Promise<MenuInterface> {
    private async getMenu(userId: string) {
        return await Menu.find({ userId: userId });
    }

    private async menuExists(menu: MenuInterface[]): Promise<boolean> {
        if (!menu || menu.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    // private async getRecipes(weeklyMenu: MenuInterface[]): Promise<RecipeInterface> {
    private async getRecipes(weeklyMenu: MenuInterface[]) {
        const recipeIds = weeklyMenu.map(menu => menu.recipe);
        const recipes = await Recipe.find({ _id: recipeIds });
        const repeatedRecipes: RecipeInterface[] = [];
        
        recipeIds.forEach(recipeId => {
            const recipe = recipes.find(recipeItem => recipeItem._id.toString() === recipeId.toString());
            if (recipe) {
                repeatedRecipes.push(recipe);
            }
        });
        return repeatedRecipes;
    }

    private async recipesExist(recipes: RecipeInterface[]): Promise<boolean> {
        if (!recipes || recipes.length === 0) {
            return false;
        } else {
            return true;
        }

    }

    private getIngredients(menuItems: MenuInterface[], recipes: RecipeInterface[]): IngredientInterface[] {
    const ingredientList: IngredientInterface[] = [];

    menuItems.forEach(menuItem => {
        const recipe = recipes.find(recipe => recipe._id?.toString() === menuItem.recipe.toString());
        if (!recipe) return;

        const ingredients = recipe.ingredients;

        ingredients.forEach(ingredient => {
            const adjustedQuantity = ingredient.quantity * ((menuItem.servings ?? 1) / (recipe.servings || 1));
            
            ingredientList.push({
                ingredient: ingredient.ingredient,
                quantity: adjustedQuantity,
                unit: ingredient.unit,
                checked: ingredient.checked
            });
        });
    });

    return ingredientList.sort((a, b) => a.ingredient.localeCompare(b.ingredient));
    }

    private sumOfIngredients(list: IngredientInterface[]): IngredientInterface[] {
    const ingredientMap = new Map<string, IngredientInterface>();

    list.forEach(({ _id, ingredient, quantity, unit }) => {
        const key = `${ingredient}-${unit}`;

        if (ingredientMap.has(key)) {
            ingredientMap.get(key)!.quantity += quantity;
        } else {
            ingredientMap.set(key, { _id, ingredient, quantity, unit });
        }
    });
    return Array.from(ingredientMap.values());
}
}