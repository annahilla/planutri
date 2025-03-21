"use client";

import { RecipeInterface } from "@/types/types";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface RecipeContextInterface {
  recipes: RecipeInterface[];
  totalPages: number;
  page: number;
  setPage?: (value: number) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isModal?: boolean;
}

interface RecipeProviderInterface {
  children: ReactNode;
  fetchedRecipes: RecipeInterface[];
  totalPages: number;
  page: number;
  setPage?: (value: number) => void;
  isModal?: boolean;
}

const RecipesContext = createContext<RecipeContextInterface>({
  recipes: [],
  totalPages: 1,
  page: 1,
  setPage: () => {},
  isLoading: true,
  setIsLoading: () => {},
  isModal: false,
});

export const useRecipes = () => {
  return useContext(RecipesContext);
};

export const RecipesProvider = ({
  children,
  fetchedRecipes,
  totalPages,
  page,
  setPage,
  isModal,
}: RecipeProviderInterface) => {
  const searchParams = useSearchParams();

  const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(false);
    setRecipes(fetchedRecipes);
  }, [fetchedRecipes]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        totalPages,
        page,
        setPage,
        isLoading,
        setIsLoading,
        isModal,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
