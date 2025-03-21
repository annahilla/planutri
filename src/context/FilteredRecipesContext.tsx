"use client";

import { RecipeInterface } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface FilteredRecipesContextInterface {
  filteredRecipes: RecipeInterface[];
  setFilteredRecipes: (filteredRecipes: RecipeInterface[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

interface FilteredRecipesProviderInterface {
  recipes: RecipeInterface[];
  children: ReactNode;
}

const FilteredRecipesContext = createContext<FilteredRecipesContextInterface>({
  filteredRecipes: [],
  setFilteredRecipes: () => {},
  isLoading: false,
  setIsLoading: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

export const useFilteredRecipes = () => {
  return useContext(FilteredRecipesContext);
};

export const FilteredRecipesProvider = ({
  children,
}: FilteredRecipesProviderInterface) => {
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FilteredRecipesContext.Provider
      value={{
        filteredRecipes,
        setFilteredRecipes,
        isLoading,
        setIsLoading,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </FilteredRecipesContext.Provider>
  );
};
