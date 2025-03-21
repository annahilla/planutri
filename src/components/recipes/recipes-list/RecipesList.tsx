"use client";

import { RecipeInterface } from "@/types/types";
import RecipeCard from "./RecipeCard";
import SearchInput from "@/components/ui/SearchInput";
import { useEffect, useState } from "react";
import Toolbar from "./toolbar/Toolbar";
import { useRecipes } from "@/context/RecipesContext";
import Pagination from "./Pagination";
import Loader from "@/components/ui/Loader";
import { useFilteredRecipes } from "@/context/FilteredRecipesContext";

interface RecipeListProps {
  onSelect?: (recipe: RecipeInterface, servings: number) => void;
}

const RecipesList = ({ onSelect }: RecipeListProps) => {
  const { isLoading, recipes, isModal } = useRecipes();
  const { filteredRecipes, setFilteredRecipes } = useFilteredRecipes();
  const [menuServings, setMenuServings] = useState<{ [key: string]: number }[]>(
    []
  );
  const noRecipes = !recipes || recipes.length === 0;

  useEffect(() => {
    setFilteredRecipes(recipes);
    console.log(recipes);
  }, []);

  return (
    <>
      <SearchInput />
      <Toolbar />

      {isLoading ? (
        <Loader />
      ) : noRecipes ? (
        <p className="mt-14 text-center">
          We haven&apos;t found any recipes that match this filters
        </p>
      ) : (
        <>
          <div
            className={`grid grid-cols-1 gap-3 mt-4 mb-8 items-center md:items-start md:w-full md:grid-cols-2 lg:gap-4  ${
              isModal
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
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination />
        </>
      )}
    </>
  );
};

export default RecipesList;
