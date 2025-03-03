"use client";

import { RecipeInterface } from "@/types/types";
import { createContext, ReactNode, useContext } from "react";

interface RecipeContextInterface {
  recipes: RecipeInterface[];
  favoriteRecipes: string[];
}

interface RecipeProviderInterface {
  children: ReactNode;
  fetchedRecipes: RecipeInterface[];
  fetchedFavoriteRecipes?: string[];
}

const RecipesContext = createContext<RecipeContextInterface>({
  recipes: [],
  favoriteRecipes: [],
});

export const useRecipes = () => {
  return useContext(RecipesContext);
};

export const RecipesProvider = ({
  children,
  fetchedRecipes,
  fetchedFavoriteRecipes,
}: RecipeProviderInterface) => {
  const recipes = fetchedRecipes;
  const favoriteRecipes = fetchedFavoriteRecipes || [];

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        favoriteRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
