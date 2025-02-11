"use client";

import { ChangeEvent, JSX, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { DayOfTheWeek, Meal, MenuInterface, Recipe } from "@/types/types";
import RecipesList from "../RecipesList";
import { CiSearch } from "react-icons/ci";
import {
  PiCoffeeThin,
  PiBowlFoodThin,
  PiBowlSteamThin,
  PiOrangeThin,
} from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { addRecipeToMenu, deleteSingleMenu } from "@/services/menuService";
import { IoMdClose } from "react-icons/io";
import { LiaExchangeAltSolid } from "react-icons/lia";
import RecipeDetails from "../RecipeDetails";
import { setMenu } from "@/lib/store/menu/menuSlice";

const Day = ({
  dayOfTheWeek,
  recipes,
}: {
  dayOfTheWeek: DayOfTheWeek;
  recipes: Recipe[];
}) => {
  const dispatch = useAppDispatch();
  const meals: Meal[] = ["Breakfast", "Lunch", "Snack", "Dinner"];
  const [isSelectRecipeModalOpen, setIsSelectRecipeModalOpen] = useState(false);
  const [isRecipeDetailsModalOpen, setIsRecipeDetailsModalOpen] =
    useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const token = useAppSelector((state) => state.auth.user?.token);
  const fullMenu = useAppSelector((state) => state.menu.menu);
  const dayMenu = fullMenu.filter(
    (fullMenu) => fullMenu.dayOfTheWeek === dayOfTheWeek
  );
  const [selectedRecipes, setSelectedRecipes] = useState<{
    [meal: string]: Recipe | null;
  }>({});

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const updateSelectedRecipes = () => {
    const newSelectedRecipes = dayMenu.reduce(
      (acc, menuItem: MenuInterface) => {
        const selectedRecipe = recipes.find(
          (recipe: Recipe) => recipe._id === menuItem.recipe
        );
        if (selectedRecipe) {
          acc[menuItem.meal] = selectedRecipe;
        }
        return acc;
      },
      {} as { [meal: string]: Recipe | null }
    );

    if (
      JSON.stringify(selectedRecipes) !== JSON.stringify(newSelectedRecipes)
    ) {
      setSelectedRecipes(newSelectedRecipes);
    }
  };

  useEffect(() => {
    updateSelectedRecipes();
  }, [dayMenu]);

  const mealIcons: { [key: string]: JSX.Element } = {
    Breakfast: <PiCoffeeThin />,
    Lunch: <PiBowlFoodThin />,
    Snack: <PiOrangeThin />,
    Dinner: <PiBowlSteamThin />,
  };

  const closeSelectRecipeModal = () => {
    setIsSelectRecipeModalOpen(false);
    setSelectedMeal(null);
  };

  const openSelectRecipeModal = (meal: Meal) => {
    setIsSelectRecipeModalOpen(true);
    setSelectedMeal(meal);
  };

  const closeRecipeDetailsModal = () => {
    setIsRecipeDetailsModalOpen(false);
    setSelectedMeal(null);
  };

  const openRecipeDetailsModal = (currentRecipe: Recipe) => {
    setIsRecipeDetailsModalOpen(true);
    if (currentRecipe !== null) {
      setSelectedRecipe(currentRecipe);
    }
  };

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

  const selectRecipe = async (recipe: Recipe, selectedMeal: Meal) => {
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

    closeSelectRecipeModal();
  };

  const clearSingleRecipe = async (meal: Meal) => {
    const menuItem = dayMenu.find((menuItem) => menuItem.meal === meal);
    const recipeId = menuItem ? menuItem._id?.toString() : "";
    if (token && recipeId) {
      const isDeleted = await deleteSingleMenu(recipeId, token);
      if (isDeleted) {
        const updatedMenu = fullMenu.filter((item) => item._id !== recipeId);
        dispatch(setMenu({ menu: updatedMenu }));
      }
    }
  };

  const handleClearRecipe = async (recipeId: string) => {
    setSelectedRecipes((prev) => {
      const updatedRecipes = { ...prev };
      Object.keys(updatedRecipes).forEach((meal) => {
        if (updatedRecipes[meal]?._id === recipeId) {
          updatedRecipes[meal] = null;
        }
      });
      return updatedRecipes;
    });
  };

  return (
    <>
      <div className="w-auto">
        <h5 className="my-2 text-sm font-bold text-left text-black">
          {dayOfTheWeek}
        </h5>
        <div className="bg-neutral-50 px-3 py-4 rounded text-center shadow-sm">
          <div className="flex flex-col items-center gap-4">
            {meals.map((meal) => (
              <div
                className="flex flex-col items-start gap-1 rounded w-full text-left"
                key={meal}
              >
                <div className="flex items-center gap-2 text-neutral-600">
                  {mealIcons[meal]}
                  <p className="text-xs">{meal}</p>
                </div>
                {selectedRecipes[meal] ? (
                  <div className="flex justify-between bg-white w-full p-2 items-center rounded shadow-sm">
                    <button
                      onClick={() =>
                        selectedRecipes[meal] &&
                        openRecipeDetailsModal(selectedRecipes[meal])
                      }
                      className="text-left text-sm text-neutral-800  border border-white  outline-none"
                    >
                      {selectedRecipes[meal]?.name}
                    </button>
                    <div className="flex items-center gap-1 text-neutral-600">
                      <button
                        onClick={() => openSelectRecipeModal(meal)}
                        className="hover:bg-neutral-100 rounded-full p-1 text-xs"
                      >
                        <LiaExchangeAltSolid />
                      </button>
                      <button
                        onClick={() => clearSingleRecipe(meal)}
                        className="hover:bg-neutral-100 rounded-full p-1 text-xs"
                      >
                        <IoMdClose />
                      </button>
                    </div>
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
      <Modal
        isOpen={isSelectRecipeModalOpen}
        closeModal={closeSelectRecipeModal}
      >
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
      <Modal
        isOpen={isRecipeDetailsModalOpen}
        closeModal={closeRecipeDetailsModal}
      >
        <div className="px-5 w-full">
          <RecipeDetails
            isModal={true}
            closeModal={closeRecipeDetailsModal}
            currentRecipe={selectedRecipe ?? ({} as Recipe)}
            clearRecipe={handleClearRecipe}
          />
        </div>
      </Modal>
    </>
  );
};

export default Day;
