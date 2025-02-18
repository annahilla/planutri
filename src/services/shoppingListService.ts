import { IngredientInterface } from "@/types/types";
import { toast } from "react-toastify";

export const getShoppingList = async (token: string) => {
  try {
    const response = await fetch(`/api/shopping-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error("Error fetching recipes");
    }

    const data = await response.json()
    const shoppingList = data[0].list;

    return shoppingList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateShoppingList  = async (token: string): Promise<IngredientInterface[]> => {
  try {
    const response = await fetch("/api/shopping-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error("Error fetching shopping list");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching shopping list:", error);
    return [];
  }
};

export const deleteShoppingList = async (token: string) => {
  try {
    const response = await fetch(`/api/shopping-list`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      toast.error("Failed to clear the shopping list. Please try again.");
      return;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    toast.error("An unexpected error occurred. Please try again later.");
  }
};

export const updateShoppingList = async (ingredient: IngredientInterface, token: string): Promise<IngredientInterface[]> => {
  const id = ingredient._id;
  try {
    const response = await fetch("/api/shopping-list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ id, ...ingredient }),
    });

    if (!response.ok) {
      toast.error("There was an error updating the shopping list");
      throw new Error("Error updating shopping list");
    }

    const updatedShoppingList = await response.json();
    return updatedShoppingList;
  } catch (error) {
    console.error(error);
    toast.error("An unexpected error occurred. Please try again later.");
    return [];
  }
}