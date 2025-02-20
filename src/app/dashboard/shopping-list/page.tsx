"use client";

import Loader from "@/components/ui/Loader";
import PageTitle from "@/components/ui/PageTitle";
import { fetchShoppingList } from "@/lib/store/apis/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import {
  generateShoppingList,
  updateShoppingList,
} from "@/services/shoppingListService";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShoppingListItem from "../../../components/shopping-list/ShoppingListItem";
import { IngredientInterface } from "@/types/types";

const ShoppingList = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.user?.token);
  const shoppingList = useAppSelector(
    (state) => state.shoppingList.shoppingList
  );
  const isLoading = useAppSelector(
    (state) => state.shoppingList.status === "loading"
  );
  const [currentList, setCurrentList] = useState<IngredientInterface[] | []>(
    shoppingList
  );

  const updateCurrentList = () => {
    setCurrentList(shoppingList);
  };

  const handleCheckboxChange = (updatedItem: IngredientInterface) => {
    setCurrentList((prevList) => {
      const updatedList = prevList.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      );

      return updatedList.sort((a, b) => {
        if (a.checked !== b.checked) {
          return Number(a.checked) - Number(b.checked);
        }
        return a.ingredient.localeCompare(b.ingredient);
      });
    });

    if (token) {
      updateShoppingList(updatedItem, token);
    }
  };

  useEffect(() => {
    if (token) {
      generateShoppingList(token);
    }
    dispatch(fetchShoppingList());
  }, []);

  useEffect(() => {
    updateCurrentList();
  }, [shoppingList]);

  return (
    <div className="h-full">
      <PageTitle>Shopping List</PageTitle>
      <div className="flex flex-col gap-2 items-center h-full bg-white rounded text-black md:items-start">
        {isLoading ? (
          <Loader />
        ) : shoppingList.length > 0 ? (
          <div className="mt-3 flex flex-col items-start gap-8 border border-neutral-400 rounded p-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="flex flex-col gap-2 w-full">
              {currentList
                .slice()
                .sort((a, b) => Number(a.checked) - Number(b.checked))
                .map((shoppingItem, index) => (
                  <ShoppingListItem
                    key={`${shoppingItem._id}-${index}`}
                    shoppingItem={shoppingItem}
                    onCheckboxChange={handleCheckboxChange}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="my-4 text-neutral-600">
            The shopping list is empty, select recipes in the{" "}
            <Link className="underline" href={"/dashboard/menu"}>
              meal planner
            </Link>{" "}
            first to generate it.
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
