"use client";

import { RecipeInterface } from "@/types/types";
import { ChangeEvent, useEffect, useState } from "react";

const useSearchRecipe = (recipes: RecipeInterface[]) => {
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>(recipes);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const searchRecipe = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setFilteredRecipes(
      query === ""
        ? recipes
        : recipes.filter((recipe) => recipe.name.toLowerCase().includes(query))
    );
  };

  return { filteredRecipes, searchRecipe, setFilteredRecipes };
}

export default useSearchRecipe;