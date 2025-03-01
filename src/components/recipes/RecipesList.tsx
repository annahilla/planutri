"use client";

import { RecipeInterface } from "@/types/types";
import RecipeCard from "./RecipeCard";
import SearchInput from "../ui/SearchInput";
import useSearchRecipe from "@/hooks/useSearchRecipe";

interface RecipeListProps {
  recipes: RecipeInterface[];
  onSelect?: (recipe: RecipeInterface) => void;
  isModal?: boolean;
}

const RecipesList = ({
  recipes,
  onSelect,
  isModal = false,
}: RecipeListProps) => {
  const { filteredRecipes, searchRecipe } = useSearchRecipe(recipes);

  return (
    <div>
      <SearchInput search={searchRecipe} />
      <div className="grid grid-cols-1 gap-3 mt-4 items-center md:items-start md:w-full md:grid-cols-2 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <div
            className="w-full h-full"
            key={recipe._id}
            onClick={() => onSelect?.(recipe)}
          >
            <div className="h-full">
              <RecipeCard recipe={recipe} isModal={isModal} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
