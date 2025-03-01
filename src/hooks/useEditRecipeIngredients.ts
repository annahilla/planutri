import { useState } from "react";
import { IngredientInterface } from "@/types/types";

const useEditRecipeIngredients = (initialIngredients: IngredientInterface[]) => {
  const [ingredients, setIngredients] = useState<IngredientInterface[]>(initialIngredients);
  const [error, setError] = useState<string>("");

  const addIngredientInput = () => {
    const newIngredient: IngredientInterface = {
      _id: crypto.randomUUID(),
      ingredient: "",
      quantity: 0,
      unit: "g",
    };
    setIngredients((prev) => [...prev, newIngredient]);
  };

  const deleteIngredient = (id: string) => {
    if (ingredients.length <= 1) {
      setError("You can't delete all ingredients");
      return;
    }
    setError("");
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient._id !== id)
    );
  };

  return {
    ingredients,
    addIngredientInput,
    deleteIngredient,
    error,
    setIngredients,
    setError,
  };
};

export default useEditRecipeIngredients;