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
import { setMenu } from "@/lib/store/apis/menuSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";

interface RecipeListModalProps {
  isModalOpen: boolean;
  dayOfTheWeek: DayOfTheWeek;
  selectedMeal: Meal | null;
  closeModal: () => void;
}

const RecipeListModal = ({
  isModalOpen,
  dayOfTheWeek,
  selectedMeal,
  closeModal,
}: RecipeListModalProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.user?.token);
  const recipes = useAppSelector((state) => state.recipes.recipes);
  const fullMenu = useAppSelector((state) => state.menu.menu);

  const selectRecipe = async (recipe: RecipeInterface, selectedMeal: Meal) => {
    try {
      const newMenu: MenuInterface = {
        recipe,
        dayOfTheWeek,
        meal: selectedMeal,
      };
      if (token) {
        const addedMenuItem = await addRecipeToMenu(newMenu, token);
        if (addedMenuItem) {
          const updatedMenu = [...fullMenu, addedMenuItem];
          dispatch(setMenu({ menu: updatedMenu }));
        }
      }
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  return (
    <Modal isSmall={false} isOpen={isModalOpen} closeModal={closeModal}>
      <h3 className="text-xl">
        Choose a recipe for {selectedMeal} on {dayOfTheWeek}
      </h3>
      <RecipesList
        recipes={recipes}
        showLinks={false}
        onSelect={(recipe) => selectRecipe(recipe, selectedMeal!)}
      />
    </Modal>
  );
};

export default RecipeListModal;
