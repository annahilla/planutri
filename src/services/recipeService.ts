import { RecipeInterface } from "@/types/types";
import { toast } from "react-toastify";

export const getRecipes = async (token: string) => {
  try {
    const response = await fetch(`/api/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipe = async (id: string, token: string) => {
  const response = await fetch(`/api/recipes/${id}`, {
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
  });
  const recipe = await response.json();
  return recipe;
}

export const addRecipe = async (recipe: RecipeInterface) => {
    try {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export const updateRecipe = async (recipe: Partial<RecipeInterface>, token: string) => {
  const id = recipe._id;
  try {
    const response = await fetch(`/api/recipes/${id}`, {
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


export const deleteRecipe = async (id: string) => {
    try {
        const response = await fetch("/api/recipes", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
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

export const uploadRecipeImage = async (formData: FormData) => {
    const cloudinaryUrl = process.env.CLOUDINARY_UPLOAD_URL;

    if (!cloudinaryUrl) {
      console.error("Cloudinary URL is missing.");
      return;
    }

  try {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        return data.secure_url; 
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred while uploading.");
      return null;
    } 
}