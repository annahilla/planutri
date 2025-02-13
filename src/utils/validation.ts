import { IngredientInterface } from "@/types/types";

export const validateUserInput = (email: string, password: string) => {
  if (!email || email.trim() === "") {
    return "Please enter an email";
  }

  if (!password || password.trim() === "") {
    return "Please enter a password";
  }

  return null;
};

export const validateCreateRecipeForm = (recipeName: string, ingredients: IngredientInterface[]) => {
      if (!recipeName.trim()) {
      return "Please enter a recipe name";
    }

    if (ingredients.length === 0) {
      return "Please enter at least one ingredient";
    }

    if (ingredients.length > 0) {
      for (const ing of ingredients) {
        if (ing.quantity <= 0 || isNaN(ing.quantity)) {
          return `Please enter a valid quantity for ${ing.ingredient}`;
        }
      }
    }

    return null;
}
