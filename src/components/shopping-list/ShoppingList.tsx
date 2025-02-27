"use client";

import ShoppingListItem from "./ShoppingListItem";
import { useEffect, useState } from "react";
import { IngredientInterface } from "@/types/types";
import { updateShoppingList } from "@/services/shoppingListService";
import Link from "next/link";

const ShoppingList = ({
  shoppingList,
}: {
  shoppingList: IngredientInterface[];
}) => {
  const [currentShoppingList, setCurrentShoppingList] = useState(shoppingList);

  const handleCheckboxChange = (updatedItem: IngredientInterface) => {
    setCurrentShoppingList((prevList) => {
      const updatedList = prevList.map((item) =>
        item.ingredient === updatedItem.ingredient ? updatedItem : item
      );

      return updatedList.sort((a, b) => {
        if (a.checked !== b.checked) {
          return Number(a.checked) - Number(b.checked);
        }
        return a.ingredient.localeCompare(b.ingredient);
      });
    });

    updateShoppingList(updatedItem);
  };

  useEffect(() => {
    setCurrentShoppingList(shoppingList);
  }, [shoppingList]);

  return (
    <>
      {shoppingList.length > 0 ? (
        <div className="mt-3 flex flex-col gap-2 border border-neutral-400 rounded px-7 py-5 w-full md:w-72">
          {currentShoppingList
            .slice()
            .sort((a, b) => Number(a.checked) - Number(b.checked))
            .map((shoppingItem) => (
              <ShoppingListItem
                key={shoppingItem.ingredient}
                shoppingItem={shoppingItem}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
        </div>
      ) : (
        <div className="my-4 text-neutral-600">
          The shopping list is empty. Select recipes in the{" "}
          <Link className="underline" href={"/dashboard/menu"}>
            meal planner
          </Link>{" "}
          if you haven&apos;t yet and then{" "}
          <button
            className="underline"
            onClick={() => window.location.reload()}
          >
            generate the shopping list
          </button>
          .
        </div>
      )}
    </>
  );
};

export default ShoppingList;
