"use client"

import { Recipe } from "@/types/types";
import { toast } from "react-toastify";

const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getRecipes = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error("Error fetching recipes");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipe = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
  });
  const recipe = await response.json();
  return recipe;
}

export const addRecipe = async (recipe: Recipe, token: string) => {
    try {
    const response = await fetch(`${baseUrl}/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

export const updateRecipe = async (recipe: Partial<Recipe>, token: string) => {
  const id = recipe._id;
  try {
    const response = await fetch(`${baseUrl}/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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


export const deleteRecipe = async (id: string, token:string) => {
    try {
        const response = await fetch(`${baseUrl}/api/recipes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
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
