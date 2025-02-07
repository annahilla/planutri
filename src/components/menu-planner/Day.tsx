"use client";

import { ChangeEvent, JSX, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { Recipe } from "@/types/types";
import RecipesList from "../RecipesList";
import { getRecipes } from "@/services/recipeService";
import { CiSearch } from "react-icons/ci";
import {
  PiCoffeeThin,
  PiBowlFoodThin,
  PiBowlSteamThin,
  PiOrangeThin,
} from "react-icons/pi";

const Day = ({ dayOfTheWeek }: { dayOfTheWeek: string }) => {
  const meals = ["Breakfast", "Lunch", "Snack", "Dinner"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [selectedRecipes, setSelectedRecipes] = useState<{
    [meal: string]: Recipe | null;
  }>({});

  const mealIcons: { [key: string]: JSX.Element } = {
    Breakfast: <PiCoffeeThin />,
    Lunch: <PiBowlFoodThin />,
    Snack: <PiOrangeThin />,
    Dinner: <PiBowlSteamThin />,
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal("");
  };

  const openModal = (meal: string) => {
    setIsModalOpen(true);
    setSelectedMeal(meal);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
    };
    fetchRecipes();
  }, []);

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

  const selectRecipe = (recipe: Recipe, selectedMeal: string) => {
    setSelectedRecipes((prev) => ({
      ...prev,
      [selectedMeal]: recipe,
    }));
    closeModal();
  };

  return (
    <>
      <div className="w-auto">
        <h5 className="my-2 text-sm font-bold text-left">{dayOfTheWeek}</h5>
        <div className="bg-neutral-50 px-3 py-4 rounded text-center shadow-sm">
          <div className="flex flex-col items-center gap-4">
            {meals.map((meal) => (
              <div
                onClick={() => openModal(meal)}
                className="flex flex-col items-start gap-1 rounded w-full text-left"
                key={meal}
              >
                <div className="flex items-center gap-2 text-neutral-600">
                  {mealIcons[meal]}
                  <p className="text-sm">{meal}</p>
                </div>
                {selectedRecipes[meal] ? (
                  <button className="text-left text-sm text-neutral-800 bg-white w-full p-2 border border-white rounded shadow-sm outline-none">
                    {selectedRecipes[meal]?.name}
                  </button>
                ) : (
                  <button className="text-left text-neutral-300 text-xs bg-white w-full p-2 border border-white hover:text-neutral-400 hover:border-neutral-100 rounded shadow-sm outline-none">
                    + Add recipe
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
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
          onSelect={(recipe) => selectRecipe(recipe, selectedMeal)}
        />
      </Modal>
    </>
  );
};

export default Day;
