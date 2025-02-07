import { Recipe } from "@/types/types";
import { toast } from "react-toastify";

const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getRecipes = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/recipes`);

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
    const response = await fetch(`${baseUrl}/api/recipes`, {
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

export const updateRecipe = async (recipe: Partial<Recipe>) => {
  const id = recipe._id;
  try {
    const response = await fetch(`${baseUrl}/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...recipe }),
    });

    if (!response.ok) {
      toast.error("There was an error updating the recipe");
      throw new Error("Error updating recipe");
    }

    const updatedRecipe = await response.json();
    toast.success("The recipe was updated successfully");
    return updatedRecipe;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};


export const deleteRecipe = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/recipes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            toast.error("There was an error deleting the recipe");
            throw new Error("Failed to delete the recipe");
        }

        toast.success("Recipe deleted successfully");
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
};
