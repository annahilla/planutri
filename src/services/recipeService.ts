import { Recipe } from "@/types/types";
import { toast } from "react-toastify";

export const getRecipes = async () => {
  try {
    const response = await fetch("/api/recipes");

    if (!response.ok) {
      toast.error("There was an error fetching the recipes");
      throw new Error("Error fetching recipes");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addRecipe = async (recipe: Recipe) => {
    try {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      toast.error("There was an error creating the recipe");
      throw new Error("Error creating recipe");
    }

    toast.success("The recipe was created successfully");
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
