import { RecipeInterface } from "@/types/types";
import { toast } from "react-toastify";

export const addRecipe = async (recipe: RecipeInterface) => {
    try {
    const response = await fetch("/api/recipes", {
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

export const updateRecipe = async (recipe: Partial<RecipeInterface>) => {
  const id = recipe._id;
  try {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export const getRecipeUsername = async (recipeId: string | unknown) => {
  if(!recipeId) {return}
    try {
        const response = await fetch(`/api/recipes/${recipeId}/username`,{
          method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          credentials: "include"
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error("Failed to fetch username");
        }
        return data.username;
    } catch (error) {
        console.error("Error fetching username:", error);
    }
};

export const getUnits = async () => {
  try {
    const response = await fetch(`/api/units`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching units");
    }
    const data = await response.json()
    return data[0].units;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getIngredients = async () => {
  try {
    const response = await fetch(`/api/ingredients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching ingredients");
    }
    const data = await response.json();
    return data[0].ingredients;
  } catch (error) {
    console.error(error);
    throw error;
  }
};