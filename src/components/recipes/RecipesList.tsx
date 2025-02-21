"use client";

import { RecipeInterface } from "@/types/types";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: RecipeInterface[];
  onSelect?: (recipe: RecipeInterface) => void;
  showLinks?: boolean;
}

const RecipesList = ({
  recipes,
  onSelect,
  showLinks = true,
}: RecipeListProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 mt-4 items-center md:items-start md:w-full md:grid-cols-2 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <div
          className="w-full h-full"
          key={recipe._id}
          onClick={() => onSelect?.(recipe)}
        >
          <div className="h-full">
            <RecipeCard recipe={recipe} showLinks={showLinks} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
