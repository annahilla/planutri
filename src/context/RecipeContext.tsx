"use client";

import { RecipeInterface } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface RecipeContextInterface {
  recipe: RecipeInterface;
  setRecipe: (recipes: RecipeInterface) => void;
  discardChanges: boolean;
  setDiscardChanges: (value: boolean) => void;
}

interface RecipeProviderInterface {
  children: ReactNode;
  fetchedRecipe: RecipeInterface;
}

const RecipeContext = createContext<RecipeContextInterface>({
  recipe: {
    ingredients: [],
    name: "",
  },
  setRecipe: () => {},
  discardChanges: false,
  setDiscardChanges: () => {},
});

export const useRecipe = () => {
  return useContext(RecipeContext);
};

export const RecipeProvider = ({
  children,
  fetchedRecipe,
}: RecipeProviderInterface) => {
  const [recipe, setRecipe] = useState<RecipeInterface>(fetchedRecipe);
  const [discardChanges, setDiscardChanges] = useState(false);

  return (
    <RecipeContext.Provider
      value={{
        setRecipe,
        recipe,
        discardChanges,
        setDiscardChanges,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
