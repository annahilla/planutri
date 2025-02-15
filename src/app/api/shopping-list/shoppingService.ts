import ShoppingList from '@/database/models/shopping-list';
import connect from "@/database/db";
import Menu from "@/database/models/menu";
import Recipe from "@/database/models/recipes";
import { IngredientInterface, MenuInterface, RecipeInterface } from "@/types/types";
import { NextResponse } from "next/server";

export class shoppingService {

    async generateShoppingList(userId: string) {
        await connect();
        const menu = await this.getMenu(userId);

        if(!this.menuExists(menu)){
            return new NextResponse("No menus found", { status: 404 });
        }

        const recipes = await this.getRecipes(menu);

        if(!this.recipesExist(recipes)) {
            return new NextResponse("No recipes found", { status: 404 });
        }

        const shoppingList = this.getIngredients(recipes);
        console.log("shoppingList");

        const newShoppingList = new ShoppingList({userId, list: shoppingList});
        await newShoppingList.save();

        return shoppingList;
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
        const recipes = await Recipe.find({ _id: { $in: recipeIds } });
        return recipes;
    }

    private async recipesExist(recipes: RecipeInterface[]): Promise<boolean> {
        if (!recipes || recipes.length === 0) {
            return false;
        } else {
            return true;
        }

    }

    private getIngredients(recipes: RecipeInterface[]): IngredientInterface[] {
        return recipes.flatMap(recipe => recipe.ingredients);
    }
}