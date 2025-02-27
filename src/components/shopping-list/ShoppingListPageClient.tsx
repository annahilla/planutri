"use client";

import MenuUpdatedAlert from "./MenuUpdatedAlert";
import ShoppingList from "./ShoppingList";
import ShoppingListPageHeader from "./ShoppingListHeader";
import { useState } from "react";
import { IngredientInterface, MenuInterface } from "@/types/types";

const ShoppingListPageClient = ({
  shoppingList,
  menu,
}: {
  shoppingList: IngredientInterface[];
  menu: MenuInterface[];
}) => {
  const [list, setList] = useState(shoppingList);

  return (
    <>
      <ShoppingListPageHeader
        setList={setList}
        menu={menu}
        shoppingList={shoppingList}
      />

      <div className="flex flex-col gap-2 items-center h-full bg-white rounded text-black md:items-start">
        <MenuUpdatedAlert menu={menu} shoppingList={shoppingList} />
        <ShoppingList shoppingList={list} />
      </div>
    </>
  );
};

export default ShoppingListPageClient;
