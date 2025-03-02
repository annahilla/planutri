"use client";

import { PulseLoader } from "react-spinners";
import IconButton from "../ui/buttons/IconButton";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { DayOfTheWeek, Meal, RecipeInterface } from "@/types/types";
import { IoMdClose } from "react-icons/io";
import { useState, SetStateAction } from "react";
import { useMenu } from "@/context/MenuContext";
import { deleteSingleMenu } from "@/services/menuService";
import { useMenuModal } from "@/hooks/useMenuModal";
import RecipeDetailsModal from "./RecipeDetailsModal";

interface MealItemProps {
  meal: Meal;
  recipe: RecipeInterface | null;
  dayOfTheWeek: DayOfTheWeek;
  setSelectedRecipes: React.Dispatch<
    SetStateAction<{ [meal: string]: RecipeInterface | null }>
  >;
  openSelectRecipeModal: (meal: Meal) => void;
}

const MealItem = ({
  meal,
  recipe,
  dayOfTheWeek,
  setSelectedRecipes,
  openSelectRecipeModal,
}: MealItemProps) => {
  const {
    closeModal,
    isRecipeDetailsModalOpen,
    selectedRecipe,
    openRecipeDetailsModal,
  } = useMenuModal();

  const { menu, setMenu } = useMenu();
  const dayMenu = menu.filter((menu) => menu.dayOfTheWeek === dayOfTheWeek);

  const [isLoading, setIsLoading] = useState(false);

  const clearSingleRecipe = async (meal: Meal) => {
    setIsLoading(true);
    const menuItem = dayMenu.find((menuItem) => menuItem.meal === meal);
    const recipeId = menuItem ? menuItem._id?.toString() : "";
    if (recipeId) {
      const isDeleted = await deleteSingleMenu(recipeId);
      if (isDeleted) {
        const updatedMenu = menu.filter((item) => item._id !== recipeId);
        setMenu(updatedMenu);
        setIsLoading(false);
      }
    }
  };

  const handleClearRecipe = async (recipeId: string) => {
    setSelectedRecipes((prev) => {
      const updatedRecipes = { ...prev };
      Object.keys(updatedRecipes).forEach((meal) => {
        if (updatedRecipes[meal]?._id === recipeId) {
          updatedRecipes[meal] = null;
          setSelectedRecipes((prev) => {
            const updatedRecipes = { ...prev };
            updatedRecipes[meal] = null;
            return updatedRecipes;
          });
        }
      });
      return updatedRecipes;
    });
  };

  const handleRecipeClick = (currentRecipe: RecipeInterface | null) => {
    if (currentRecipe) {
      openRecipeDetailsModal(currentRecipe);
    }
  };

  return (
    <>
      <div className="flex justify-between bg-white w-full p-2 items-center rounded shadow-sm group">
        <button
          onClick={() => handleRecipeClick(recipe)}
          className="text-left text-sm text-neutral-800 border border-white outline-none truncate w-full hover:opacity-75"
        >
          {isLoading ? (
            <PulseLoader color="#635F53" className="text-center" size={2} />
          ) : (
            recipe?.name
          )}
        </button>
        {!isLoading && (
          <div className="flex items-center gap-1 text-neutral-600 lg:hidden group-hover:flex">
            <IconButton
              handleClick={() => openSelectRecipeModal(meal)}
              icon={<LiaExchangeAltSolid />}
            />
            <IconButton
              handleClick={() => clearSingleRecipe(meal)}
              icon={<IoMdClose />}
            />
          </div>
        )}
      </div>
      <RecipeDetailsModal
        isModalOpen={isRecipeDetailsModalOpen}
        closeModal={closeModal}
        selectedRecipe={selectedRecipe}
        handleClearRecipe={handleClearRecipe}
        dayOfTheWeek={dayOfTheWeek}
        meal={meal}
      />
    </>
  );
};

export default MealItem;
