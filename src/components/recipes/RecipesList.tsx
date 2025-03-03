"use client";

import { RecipeInterface } from "@/types/types";
import RecipeCard from "./RecipeCard";
import SearchInput from "../ui/SearchInput";
import useSearchRecipe from "@/hooks/useSearchRecipe";
import { useState } from "react";
import FilterTags from "./FilterTags";
import { useRecipes } from "@/context/RecipesContext";

interface RecipeListProps {
  onSelect?: (recipe: RecipeInterface, servings: number) => void;
  isMenu?: boolean;
}

const RecipesList = ({ onSelect, isMenu = false }: RecipeListProps) => {
  const { recipes } = useRecipes();
  const { filteredRecipes, setFilteredRecipes, searchRecipe } =
    useSearchRecipe(recipes);
  const [menuServings, setMenuServings] = useState(1);

  return (
    <div>
      <SearchInput search={searchRecipe} />
      <FilterTags recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
      <div className="grid grid-cols-1 gap-3 mt-4 items-center md:items-start md:w-full md:grid-cols-2 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <div
            className="w-full h-full"
            key={recipe._id}
            onClick={() => onSelect?.(recipe, menuServings)}
          >
            <div className="h-full">
              <RecipeCard
                recipe={recipe}
                recipes={recipes}
                setMenuServings={setMenuServings}
                isMenu={isMenu}
                setRecipes={setFilteredRecipes}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
