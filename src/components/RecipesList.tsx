"use client";

import { Recipe } from "@/types/types";
import Link from "next/link";

interface RecipeListProps {
  recipes: Recipe[];
  onSelect?: (recipe: Recipe) => void;
  showLinks?: boolean;
}

const RecipesList = ({
  recipes,
  onSelect,
  showLinks = true,
}: RecipeListProps) => {
  return (
    <div className="flex flex-col items-center md:items-start md:w-full">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className={`flex-1 my-2 w-full border-l-4 cursor-pointer bg-[#fcfbfb] hover:bg-neutral-50 shadow-sm
            ${showLinks ? "border-stone-100" : "border-neutral-200"}
          `}
          onClick={() => onSelect?.(recipe)}
        >
          {showLinks ? (
            <Link href={`/dashboard/recipes/${recipe._id}`}>
              <h3 className="text-xl p-5 text-neutral-700">{recipe.name}</h3>
            </Link>
          ) : (
            <h3 className="text-md p-4 text-neutral-700">{recipe.name}</h3>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
