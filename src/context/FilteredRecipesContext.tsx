"use client";

import { RecipeInterface } from "@/types/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FilteredRecipesContextInterface {
  filteredRecipes: RecipeInterface[];
  setFilteredRecipes: (filteredRecipes: RecipeInterface[]) => void;
}

interface FilteredRecipesProviderInterface {
  recipes: RecipeInterface[];
  children: ReactNode;
}

const FilteredRecipesContext = createContext<FilteredRecipesContextInterface>({
  filteredRecipes: [],
  setFilteredRecipes: () => {},
});

export const useFilteredRecipes = () => {
  return useContext(FilteredRecipesContext);
};

export const FilteredRecipesProvider = ({
  children,
}: FilteredRecipesProviderInterface) => {
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);

  useEffect(() => {
    setFilteredRecipes(filteredRecipes);
  }, [filteredRecipes]);

  return (
    <FilteredRecipesContext.Provider
      value={{
        filteredRecipes,
        setFilteredRecipes,
      }}
    >
      {children}
    </FilteredRecipesContext.Provider>
  );
};
