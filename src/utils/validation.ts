import { IngredientInterface, Meal } from "@/types/types";

export const validateUserInput = (email: string, password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email.trim() === "") {
    return "Please enter an email.";
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  if (!password || password.trim() === "") {
    return "Please enter a password.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  return null;
};

export const firebaseError = (error: string) => {
  console.log(error);
  if (error === "Firebase: Error (auth/invalid-credential).") {
    return "Invalid email or password.";
  } else if (error === "Firebase: Error (auth/email-already-in-use).") {
    return "This email is already in use.";
  } else {
    return "An error occurred. Please try again.";
  }
}

export const validateCreateRecipeForm = (recipeName: string, ingredients: IngredientInterface[], servings: number | undefined, meals: Meal[]) => {
      if (!recipeName.trim()) {
      return "Please enter a recipe name";
    }

      if (!servings) {
      return "Please enter the servings";
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

    if(meals.length === 0) {
      return "Please select at least one meal"
    }

    if(servings <= 0) {
      return "Please enter a valid quantity of servings"
    }

    return null;
}
