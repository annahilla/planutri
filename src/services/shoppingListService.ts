import { IngredientInterface } from "@/types/types";

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

    const data = await response.json();
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

