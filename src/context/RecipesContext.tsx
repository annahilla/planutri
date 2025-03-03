"use client";

import { RecipeInterface } from "@/types/types";
import { createContext, ReactNode, useContext } from "react";

interface RecipeContextInterface {
  recipes: RecipeInterface[];
}

interface RecipeProviderInterface {
  children: ReactNode;
  fetchedRecipes: RecipeInterface[];
}

const RecipesContext = createContext<RecipeContextInterface>({
  recipes: [],
});

export const useRecipes = () => {
  return useContext(RecipesContext);
};

export const RecipesProvider = ({
  children,
  fetchedRecipes,
}: RecipeProviderInterface) => {
  const recipes = fetchedRecipes;

  return (
    <RecipesContext.Provider
      value={{
        recipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
