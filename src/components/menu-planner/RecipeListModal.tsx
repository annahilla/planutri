"use client";

import Modal from "../ui/Modal";
import RecipesList from "../recipes/recipes-list/RecipesList";
import {
  DayOfTheWeek,
  Meal,
  MenuInterface,
  RecipeInterface,
} from "@/types/types";
import { addRecipeToMenu } from "@/services/menuService";
import { RecipesProvider } from "@/context/RecipesContext";
import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipeService";
import { FilteredRecipesProvider } from "@/context/FilteredRecipesContext";

interface RecipeListModalProps {
  isModalOpen: boolean;
  dayOfTheWeek: DayOfTheWeek;
  selectedMeal: Meal | null;
  fullMenu: MenuInterface[];
  setMenu: (menu: MenuInterface[]) => void;
  closeModal: () => void;
}

const RecipeListModal = ({
  isModalOpen,
  dayOfTheWeek,
  selectedMeal,
  fullMenu,
  setMenu,
  closeModal,
}: RecipeListModalProps) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentRecipes, setCurrentRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const { recipes, totalPages } = await getRecipes(page);
        setCurrentRecipes(recipes);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    if (isModalOpen) {
      loadRecipes();
    }
  }, [isModalOpen, page]);

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
      <RecipesProvider
        fetchedRecipes={currentRecipes}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        isModal
      >
        <FilteredRecipesProvider recipes={currentRecipes}>
          <RecipesList
            onSelect={(recipe, servings) =>
              selectRecipe(recipe, selectedMeal!, servings)
            }
          />
        </FilteredRecipesProvider>
      </RecipesProvider>
    </Modal>
  );
};

export default RecipeListModal;
