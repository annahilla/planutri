import { useState } from "react";
import { validateCreateRecipeForm } from "@/utils/validation";
import { updateRecipe } from "@/services/recipeService";
import { useRouter } from "next/navigation";
import useEditMode from "./useEditMode";
import { useRecipe } from "@/context/RecipeContext";

const useSaveRecipe = (
  deleteIngredient: (id: string) => void,
  isModal: boolean,
  closeModal?: () => void) => {
    const { recipe } = useRecipe();
  const [error, setError] = useState<string>("");
  const { closeEditMode } = useEditMode(recipe._id);
  const router = useRouter();


  const saveRecipe = async () => {
    const updatedIngredients = recipe.ingredients.filter(
      (ingredient) => ingredient.ingredient !== ""
    );
    const emptyIngredients = recipe.ingredients.filter(
      (ingredient) => ingredient.ingredient === ""
    );

    const validationError = validateCreateRecipeForm(recipe.name, recipe.ingredients, recipe.servings);
    if (validationError) {
      setError(validationError);
      return;
    }

    emptyIngredients.map((ingredient) => deleteIngredient(ingredient._id!));
    const ingredientsForDB = updatedIngredients.map((ingredient) => {
      const { ...rest } = ingredient;
      return rest;
    });

    const updatedRecipe = {
      _id: recipe._id,
      name: recipe.name,
      ingredients: ingredientsForDB,
      servings: recipe.servings,
      description: recipe.description,
    };

    try {
      await updateRecipe(updatedRecipe);
      router.push(`/dashboard/recipes/${updatedRecipe._id}?edit=false`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }

    if (isModal) {
      closeModal?.();
    } else {
      closeEditMode();
    }
  };

  return { saveRecipe, error };
};

export default useSaveRecipe;