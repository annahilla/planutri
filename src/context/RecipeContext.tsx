"use client";

import { RecipeInterface } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useUser } from "./UserContext";

interface RecipeContextInterface {
  recipe: RecipeInterface;
  setRecipe: (recipes: RecipeInterface) => void;
  discardChanges: boolean;
  setDiscardChanges: (value: boolean) => void;
  isOwnRecipe: boolean;
  units: string[];
  username: string;
}

interface RecipeProviderInterface {
  children: ReactNode;
  fetchedRecipe: RecipeInterface;
  fetchedUnits: string[];
  fetchedUsername: string;
}

const RecipeContext = createContext<RecipeContextInterface>({
  recipe: {
    ingredients: [],
    name: "",
  },
  setRecipe: () => {},
  discardChanges: false,
  setDiscardChanges: () => {},
  isOwnRecipe: false,
  units: [],
  username: "",
});

export const useRecipe = () => {
  return useContext(RecipeContext);
};

export const RecipeProvider = ({
  children,
  fetchedRecipe,
  fetchedUnits,
  fetchedUsername,
}: RecipeProviderInterface) => {
  const { user } = useUser();
  const [recipe, setRecipe] = useState<RecipeInterface>(fetchedRecipe);
  const [discardChanges, setDiscardChanges] = useState(false);
  const isOwnRecipe = recipe.userId === user.userId;
  const units = fetchedUnits;
  const username = fetchedUsername;

  return (
    <RecipeContext.Provider
      value={{
        setRecipe,
        recipe,
        discardChanges,
        setDiscardChanges,
        isOwnRecipe,
        units,
        username,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
