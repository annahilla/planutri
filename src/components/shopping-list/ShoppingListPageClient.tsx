"use client";

import MenuUpdatedAlert from "./MenuUpdatedAlert";
import ShoppingList from "./ShoppingList";
import ShoppingListPageHeader from "./ShoppingListHeader";
import { IngredientInterface } from "@/types/types";
import { useState } from "react";

const ShoppingListPageClient = ({
  shoppingList,
}: {
  shoppingList: IngredientInterface[];
}) => {
  const doesShoppingListExist = shoppingList.length > 0;
  const [list, setList] = useState(shoppingList);

  return (
    <>
      <ShoppingListPageHeader
        setList={setList}
        doesShoppingListExist={doesShoppingListExist}
      />

      <div className="flex flex-col gap-2 items-center h-full bg-white rounded text-black md:items-start">
        <MenuUpdatedAlert shoppingList={list} />
        <ShoppingList shoppingList={list} />
      </div>
    </>
  );
};

export default ShoppingListPageClient;
