"use client";

import { createContext, ReactNode, useContext } from "react";

interface FavoriteRecipeContextInterface {
  favoriteRecipes: string[];
}

interface FavoriteRecipeProviderInterface {
  children: ReactNode;
  fetchedFavoriteRecipes?: string[];
}

const FavoriteRecipesContext = createContext<FavoriteRecipeContextInterface>({
  favoriteRecipes: [],
});

export const useFavoriteRecipes = () => {
  return useContext(FavoriteRecipesContext);
};

export const FavoriteRecipesProvider = ({
  children,
  fetchedFavoriteRecipes,
}: FavoriteRecipeProviderInterface) => {
  const favoriteRecipes = fetchedFavoriteRecipes || [];

  return (
    <FavoriteRecipesContext.Provider
      value={{
        favoriteRecipes,
      }}
    >
      {children}
    </FavoriteRecipesContext.Provider>
  );
};
