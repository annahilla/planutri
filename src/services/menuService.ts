import { MenuInterface } from "@/types/types";
import { baseUrl } from "./recipeService";
import { toast } from "react-toastify";

export const getMenu = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/menu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
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

export const addRecipeToMenu = async (menu: MenuInterface, token: string) => {
    try {
    const response = await fetch(`${baseUrl}/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({...menu, userId: token}),
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

export const deleteFullMenu = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/menu`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
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
