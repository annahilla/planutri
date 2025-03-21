"use client";

import { DayOfTheWeek, MenuInterface, RecipeInterface } from "@/types/types";
import { mealIcons } from "@/utils/MealIcons";
import { meals } from "@/types/types";
import MealItem from "./MealItem";
import { useEffect, useState } from "react";
import { useMenu } from "@/context/MenuContext";
import { useMenuModal } from "@/hooks/useMenuModal";
import RecipeListModal from "./RecipeListModal";

const Day = ({ dayOfTheWeek }: { dayOfTheWeek: DayOfTheWeek }) => {
  const { recipes, menu, setMenu } = useMenu();
  const {
    isSelectRecipeModalOpen,
    selectedMeal,
    openSelectRecipeModal,
    closeModal,
  } = useMenuModal();
  const dayMenu = menu.filter((menu) => menu.dayOfTheWeek === dayOfTheWeek);
  const [selectedRecipes, setSelectedRecipes] = useState<{
    [meal: string]: RecipeInterface | null;
  }>({});

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

  useEffect(() => {
    updateSelectedRecipes();
  }, [menu, recipes]);

  return (
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
                <MealItem
                  meal={meal}
                  dayOfTheWeek={dayOfTheWeek}
                  recipe={selectedRecipes[meal]}
                  setSelectedRecipes={setSelectedRecipes}
                  openSelectRecipeModal={openSelectRecipeModal}
                />
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
      <RecipeListModal
        isModalOpen={isSelectRecipeModalOpen}
        closeModal={closeModal}
        dayOfTheWeek={dayOfTheWeek}
        selectedMeal={selectedMeal}
        fullMenu={menu}
        setMenu={setMenu}
      />
    </div>
  );
};

export default Day;
