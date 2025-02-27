"use client";

import { useEffect, useState } from "react";
import {
  DayOfTheWeek,
  Meal,
  MenuInterface,
  RecipeInterface,
} from "@/types/types";
import { deleteSingleMenu } from "@/services/menuService";
import { IoMdClose } from "react-icons/io";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { mealIcons } from "@/utils/MealIcons";
import RecipeListModal from "./RecipeListModal";
import RecipeDetailsModal from "./RecipeDetailsModal";
import IconButton from "../ui/buttons/IconButton";
import { meals } from "@/types/types";
import { PulseLoader } from "react-spinners";

const Day = ({
  dayOfTheWeek,
  recipes,
  fullMenu,
}: {
  dayOfTheWeek: DayOfTheWeek;
  recipes: RecipeInterface[];
  fullMenu: MenuInterface[];
}) => {
  const [isSelectRecipeModalOpen, setIsSelectRecipeModalOpen] = useState(false);
  const [isRecipeDetailsModalOpen, setIsRecipeDetailsModalOpen] =
    useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeInterface | null>(
    null
  );
  const [menu, setMenu] = useState<MenuInterface[]>(fullMenu);
  const dayMenu = menu.filter((menu) => menu.dayOfTheWeek === dayOfTheWeek);
  const [selectedRecipes, setSelectedRecipes] = useState<{
    [meal: string]: RecipeInterface | null;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    updateSelectedRecipes();
  }, [menu, recipes]);

  const updateSelectedRecipes = () => {
    const newSelectedRecipes = dayMenu.reduce(
      (acc, menuItem: MenuInterface) => {
        const selectedRecipe = recipes.find(
          (recipe: RecipeInterface) => recipe._id === menuItem.recipe
        );
        if (selectedRecipe) {
          acc[menuItem.meal] = selectedRecipe;
        }
        return acc;
      },
      {} as { [meal: string]: RecipeInterface | null }
    );

    if (
      JSON.stringify(selectedRecipes) !== JSON.stringify(newSelectedRecipes)
    ) {
      setSelectedRecipes(newSelectedRecipes);
    }
  };

  const closeModal = () => {
    setIsSelectRecipeModalOpen(false);
    setIsRecipeDetailsModalOpen(false);
    setSelectedMeal(null);
  };

  const openSelectRecipeModal = (meal: Meal) => {
    setIsSelectRecipeModalOpen(true);
    setSelectedMeal(meal);
  };

  const openRecipeDetailsModal = (currentRecipe: RecipeInterface) => {
    setIsRecipeDetailsModalOpen(true);
    if (currentRecipe) {
      setSelectedRecipe(currentRecipe);
    }
  };

  const clearSingleRecipe = async (meal: Meal) => {
    setIsLoading(true);
    const menuItem = dayMenu.find((menuItem) => menuItem.meal === meal);
    const recipeId = menuItem ? menuItem._id?.toString() : "";
    if (recipeId) {
      const isDeleted = await deleteSingleMenu(recipeId);
      if (isDeleted) {
        const updatedMenu = fullMenu.filter((item) => item._id !== recipeId);
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
      <div className="w-auto">
        <h5
          role="heading"
          className="my-2 text-sm font-bold text-left text-black"
        >
          {dayOfTheWeek}
        </h5>
        <div className="bg-beige px-3 py-4 rounded text-center shadow-sm">
          <div className="flex flex-col items-center gap-4 h-full">
            {meals.map((meal) => (
              <div
                className="flex flex-col items-start gap-1 rounded w-full text-left"
                key={meal}
              >
                <div className="flex items-center gap-2 mb-1 text-neutral-600">
                  {mealIcons[meal]}
                  <p className="text-xs">{meal}</p>
                </div>
                {selectedRecipes[meal] ? (
                  <div className="flex justify-between bg-white w-full p-2 items-center rounded shadow-sm group">
                    <button
                      onClick={() => handleRecipeClick(selectedRecipes[meal])}
                      className="text-left text-sm text-neutral-800 border border-white outline-none truncate w-full hover:opacity-75"
                    >
                      {isLoading ? (
                        <PulseLoader
                          color="#635F53"
                          className="text-center"
                          size={2}
                        />
                      ) : (
                        selectedRecipes[meal]?.name
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
                ) : (
                  <button
                    onClick={() => openSelectRecipeModal(meal)}
                    className="text-left text-neutral-300 text-xs bg-white w-full p-2 border border-white hover:text-neutral-400 hover:border-neutral-100 rounded shadow-sm outline-none"
                  >
                    + Add recipe
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <RecipeListModal
        recipes={recipes}
        isModalOpen={isSelectRecipeModalOpen}
        closeModal={closeModal}
        dayOfTheWeek={dayOfTheWeek}
        selectedMeal={selectedMeal}
        fullMenu={fullMenu}
        setMenu={setMenu}
      />
      <RecipeDetailsModal
        isModalOpen={isRecipeDetailsModalOpen}
        closeModal={closeModal}
        selectedRecipe={selectedRecipe}
        handleClearRecipe={handleClearRecipe}
      />
    </>
  );
};

export default Day;
