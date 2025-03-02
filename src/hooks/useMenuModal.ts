import { useState } from "react";
import { Meal, RecipeInterface } from "@/types/types";

export const useMenuModal = () => {
  const [isSelectRecipeModalOpen, setIsSelectRecipeModalOpen] = useState(false);
  const [isRecipeDetailsModalOpen, setIsRecipeDetailsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeInterface | null>(null);

  const openSelectRecipeModal = (meal: Meal) => {
    setIsSelectRecipeModalOpen(true);
    setSelectedMeal(meal);
  };

  const openRecipeDetailsModal = (recipe: RecipeInterface) => {
    setIsRecipeDetailsModalOpen(true);
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setIsSelectRecipeModalOpen(false);
    setIsRecipeDetailsModalOpen(false);
    setSelectedMeal(null);
    setSelectedRecipe(null);
  };

  return {
    isSelectRecipeModalOpen,
    isRecipeDetailsModalOpen,
    selectedMeal,
    selectedRecipe,
    openSelectRecipeModal,
    openRecipeDetailsModal,
    closeModal,
  };
};
