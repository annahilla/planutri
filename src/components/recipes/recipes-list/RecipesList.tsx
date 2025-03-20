"use client";

import { RecipeInterface } from "@/types/types";
import RecipeCard from "./RecipeCard";
import SearchInput from "@/components/ui/SearchInput";
import { useEffect, useState } from "react";
import Toolbar from "./toolbar/Toolbar";
import { useFilteredRecipes } from "@/context/FilteredRecipesContext";
import { useRecipes } from "@/context/RecipesContext";

interface RecipeListProps {
  onSelect?: (recipe: RecipeInterface, servings: number) => void;
  isMenu?: boolean;
}

const RecipesList = ({ onSelect, isMenu = false }: RecipeListProps) => {
  const { recipes } = useRecipes();
  const { filteredRecipes, setFilteredRecipes } = useFilteredRecipes();
  const [menuServings, setMenuServings] = useState<{ [key: string]: number }[]>(
    []
  );

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, []);

  return (
    <>
      <SearchInput />
      <Toolbar />
      <div
        className={`grid grid-cols-1 gap-3 mt-4 items-center md:items-start md:w-full md:grid-cols-2 lg:gap-4  ${
          isMenu
            ? "lg:grid-cols-2 xl:grid-cols-3"
            : "lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {filteredRecipes.map((recipe) => {
          const recipeServings =
            menuServings.find((item) => item[recipe.name] !== undefined)?.[
              recipe.name
            ] || 1;
          return (
            <div
              className="w-full h-full"
              key={recipe._id}
              onClick={() => {
                if (recipe._id) {
                  onSelect?.(recipe, recipeServings);
                }
              }}
            >
              <div className="h-full">
                <RecipeCard
                  recipe={recipe}
                  setMenuServings={setMenuServings}
                  isMenu={isMenu}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecipesList;
