import { IngredientInterface } from "@/types/types";
import { toast } from "react-toastify";

export const generateShoppingList  = async () => {
  try {
    const response = await fetch("/api/shopping-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export const deleteShoppingList = async () => {
  try {
    const response = await fetch(`/api/shopping-list`, {
      method: "DELETE",
      credentials: "include"
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

export const updateShoppingList = async (ingredient: IngredientInterface): Promise<IngredientInterface[]> => {
  const id = ingredient._id;
  try {
    const response = await fetch("/api/shopping-list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    return [];
  }
}