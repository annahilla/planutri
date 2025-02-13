import { IngredientInterface } from "@/types/types";

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

