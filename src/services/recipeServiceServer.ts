import { RecipeInterface } from "@/types/types";
import { cookies } from "next/headers";

export async function fetchRecipes() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`, {
      method: "GET",
      headers: { 
      "Content-Type": "application/json",
      "Cookie": `session=${sessionCookie?.value}`,
      },
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Error fetching recipes");
    }

    const recipes = await response.json();
    const sortedRecipes = recipes.sort((a: RecipeInterface, b: RecipeInterface) =>
      a.name.localeCompare(b.name)
    );
      
    return sortedRecipes;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export async function fetchRecipe(recipeId: string) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${recipeId}`, {
      method: "GET",
      headers: { 
      "Content-Type": "application/json",
      "Cookie": `session=${sessionCookie?.value}`,
      },
      credentials: "include",
    });

  if (!response.ok) {
      throw new Error("Error fetching recipe");
    }

    const recipes = await response.json();
    return recipes;
  } catch(error) {
    console.error(error);
    throw error;
  }
}