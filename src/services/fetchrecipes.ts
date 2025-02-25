'use server';

import { RecipeInterface } from "@/types/types";

export async function fetchRecipes(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`, {
      method: "GET",
      headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
  });

  if (!response.ok) {
      throw new Error("Error fetching recipes");
    }

  const recipes = await response.json();
  
    const sortedRecipes = recipes.sort((a: RecipeInterface, b: RecipeInterface) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
  
    return sortedRecipes;

  } catch(error) {
    console.error(error);
    throw error;
  }
}