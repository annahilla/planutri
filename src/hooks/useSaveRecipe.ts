import { validateCreateRecipeForm } from "@/utils/validation";
import { updateRecipe } from "@/services/recipeService";
import { useRouter } from "next/navigation";
import useEditMode from "./useEditMode";
import { IngredientInterface } from "@/types/types";

const useSaveRecipe = (
  recipeId: string | undefined,
  recipeName: string,
  description: string | undefined,
  ingredients: IngredientInterface[],
  servings: number,
  deleteIngredient: (id: string) => void,
  isModal: boolean,
  setError: (value: string) => void,
  closeModal?: () => void, ) => {

  const { closeEditMode } = useEditMode(recipeId);
  const router = useRouter();


  const saveRecipe = async () => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient !== ""
    );
    const emptyIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient === ""
    );

    const validationError = validateCreateRecipeForm(recipeName, ingredients, servings);
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
      _id: recipeId,
      name: recipeName,
      ingredients: ingredientsForDB,
      servings: servings,
      description: description,
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

  return { saveRecipe };
};

export default useSaveRecipe;