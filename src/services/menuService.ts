import { MenuInterface } from "@/types/types";
import { toast } from "react-toastify";

export const getMenu = async () => {
  try {
    const response = await fetch("/api/menu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching menu");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addRecipeToMenu = async (menu: MenuInterface) => {
    try {
    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({...menu}),
    });
    
    if (!response.ok) {
      toast.error("Sorry! There was an error updating the menu. Try again later.");
      throw new Error("Error creating recipe");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFullMenu = async () => {
  try {
    const response = await fetch("/api/menu", {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      toast.error("Failed to clear the menu. Please try again.");
      return;
    }

    const data = await response.json();
    toast.success("The menu was cleared successfully");
    return data;

  } catch (error) {
    console.error(error);
    toast.error("An unexpected error occurred. Please try again later.");
  }
};

export const deleteSingleMenu = async (id: string) => {
    try {
        const response = await fetch(`/api/menu/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!response.ok) {
            toast.error("There was an error deleting this recipe");
            throw new Error("Failed to delete the recipe");
        }

        return true;
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
};
