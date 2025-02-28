"use client";

import MenuUpdatedAlert from "./MenuUpdatedAlert";
import ShoppingList from "./ShoppingList";
import ShoppingListPageHeader from "./ShoppingListHeader";
import { useState } from "react";
import { IngredientInterface, MenuInterface } from "@/types/types";
import { useMenuUpdateAlert } from "@/hooks/useMenuUpdateAlert";

const ShoppingListPageClient = ({
  shoppingList,
  menu,
}: {
  shoppingList: IngredientInterface[];
  menu: MenuInterface[];
}) => {
  const [list, setList] = useState(shoppingList);
  const { showMenuUpdateAlert, dismissAlert } = useMenuUpdateAlert(menu);

  return (
    <>
      <ShoppingListPageHeader
        setList={setList}
        menu={menu}
        shoppingList={shoppingList}
        dismissAlert={dismissAlert}
      />
      <div className="flex flex-col gap-2 items-center h-full bg-white rounded text-black md:items-start">
        {showMenuUpdateAlert && (
          <MenuUpdatedAlert dismissAlert={dismissAlert} />
        )}
        <ShoppingList shoppingList={list} />
      </div>
    </>
  );
};

export default ShoppingListPageClient;
