"use client";

import Modal from "../ui/Modal";
import RecipesList from "../recipes/RecipesList";
import {
  DayOfTheWeek,
  Meal,
  MenuInterface,
  RecipeInterface,
} from "@/types/types";
import { addRecipeToMenu } from "@/services/menuService";
import { RecipesProvider } from "@/context/RecipesContext";
interface RecipeListModalProps {
  isModalOpen: boolean;
  dayOfTheWeek: DayOfTheWeek;
  selectedMeal: Meal | null;
  recipes: RecipeInterface[];
  fullMenu: MenuInterface[];
  setMenu: (menu: MenuInterface[]) => void;
  closeModal: () => void;
}

const RecipeListModal = ({
  isModalOpen,
  dayOfTheWeek,
  selectedMeal,
  recipes,
  fullMenu,
  setMenu,
  closeModal,
}: RecipeListModalProps) => {
  const selectRecipe = async (
    recipe: RecipeInterface,
    selectedMeal: Meal,
    servings: number
  ) => {
    try {
      const newMenu: MenuInterface = {
        recipe,
        dayOfTheWeek,
        meal: selectedMeal,
        servings,
      };

      const addedMenuItem = await addRecipeToMenu(newMenu);
      if (addedMenuItem) {
        const updatedMenu: MenuInterface[] = [...fullMenu, addedMenuItem];
        setMenu(updatedMenu);
      }
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  return (
    <Modal isSmall={false} isOpen={isModalOpen} closeModal={closeModal}>
      <h3 className="text-lg md:text-xl">
        Choose a recipe for {selectedMeal} on {dayOfTheWeek}
      </h3>
      <RecipesProvider fetchedRecipes={recipes}>
        <RecipesList
          isMenu
          onSelect={(recipe, servings) =>
            selectRecipe(recipe, selectedMeal!, servings)
          }
        />
      </RecipesProvider>
    </Modal>
  );
};

export default RecipeListModal;
