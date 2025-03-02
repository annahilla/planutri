"use client";

import { MenuInterface, RecipeInterface } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface MenuContextInterface {
  menu: MenuInterface[];
  recipes: RecipeInterface[];
  setMenu: (menu: MenuInterface[]) => void;
  setRecipes: (recipes: RecipeInterface[]) => void;
}

interface MenuProviderInterface {
  children: ReactNode;
  fetchedMenu: MenuInterface[];
  fetchedRecipes: RecipeInterface[];
}

const MenuContext = createContext<MenuContextInterface>({
  menu: [],
  recipes: [],
  setMenu: () => {},
  setRecipes: () => {},
});

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({
  children,
  fetchedMenu,
  fetchedRecipes,
}: MenuProviderInterface) => {
  const [menu, setMenu] = useState<MenuInterface[]>(fetchedMenu);
  const [recipes, setRecipes] = useState<RecipeInterface[]>(fetchedRecipes);

  return (
    <MenuContext.Provider
      value={{
        menu,
        recipes,
        setMenu,
        setRecipes,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
