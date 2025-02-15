"use client";

import { CiSearch } from "react-icons/ci";
import Modal from "../ui/Modal";
import RecipesList from "../recipes/RecipesList";
import {
  DayOfTheWeek,
  Meal,
  MenuInterface,
  RecipeInterface,
} from "@/types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { addRecipeToMenu } from "@/services/menuService";
import { setMenu } from "@/lib/store/menu/menuSlice";
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
  const [filteredRecipes, setFilteredRecipes] =
    useState<RecipeInterface[]>(recipes);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const searchRecipe = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    if (query === "") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.name.toLowerCase().includes(query))
      );
    }
  };

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
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <h3 className="text-xl">
        Choose a recipe for {selectedMeal} on {dayOfTheWeek}
      </h3>
      <div className="my-6 relative">
        <input
          className="border px-10 py-2 rounded-full w-full outline-none font-light shadow-sm"
          type="text"
          name="recipe"
          placeholder="Search recipe"
          onChange={searchRecipe}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
          <CiSearch />
        </div>
      </div>
      <RecipesList
        recipes={filteredRecipes}
        showLinks={false}
        onSelect={(recipe) => selectRecipe(recipe, selectedMeal!)}
      />
    </Modal>
  );
};

export default RecipeListModal;
