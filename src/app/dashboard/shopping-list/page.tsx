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
import ShoppingListItem from "@/components/shopping-list/ShoppingListItem";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { CiBoxList } from "react-icons/ci";
import AlertMessage from "@/components/ui/AlertMessage";
import { hasEnoughTimePassed } from "@/utils/hasEnoughTimePassed";
import { IngredientInterface } from "@/types/types";

const ShoppingList = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.user?.token);
  const shoppingList = useAppSelector(
    (state) => state.shoppingList.shoppingList
  );
  const menu = useAppSelector((state) => state.menu.menu);
  const [currentShoppingList, setCurrentShoppingList] = useState(shoppingList);
  const [showMenuUpdateAlert, setShowMenuUpdateAlert] = useState(false);
  const [currentList, setCurrentList] = useState<IngredientInterface[] | []>(
    shoppingList
  );

  const isLoading = useAppSelector(
    (state) => state.shoppingList.status === "loading"
  );

  const handleShoppingList = async () => {
    if (token) {
      const { list } = await generateShoppingList(token);
      if (list) {
        setCurrentShoppingList(list);
        dispatch(fetchShoppingList());
        setShowMenuUpdateAlert(false);
        localStorage.setItem("isShoppingListUpdated", "true");
      } else {
        setCurrentShoppingList([]);
      }
    }
  };

  const hasMenuChanged = () => {
    const savedMenu = localStorage.getItem("previousMenu");
    const isUpdated = localStorage.getItem("isShoppingListUpdated");

    if (
      savedMenu &&
      JSON.stringify(JSON.parse(savedMenu)) !== JSON.stringify(menu)
    ) {
      if (hasEnoughTimePassed()) {
        setShowMenuUpdateAlert(true);
        localStorage.setItem("isShoppingListUpdated", "false");
      }
    } else {
      setShowMenuUpdateAlert(isUpdated === "false" && hasEnoughTimePassed());
    }
  };

  const dismissAlert = () => {
    setShowMenuUpdateAlert(false);
    localStorage.setItem("lastDismissedTime", Date.now().toString());
  };

  const handleCheckboxChange = (updatedItem: IngredientInterface) => {
    setCurrentList((prevList) => {
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

    if (token) {
      updateShoppingList(updatedItem, token);
    }
  };

  useEffect(() => {
    dispatch(fetchShoppingList());
    const isUpdated = localStorage.getItem("isShoppingListUpdated");
    if (isUpdated === "true") {
      setShowMenuUpdateAlert(false);
    }
  }, []);

  useEffect(() => {
    hasMenuChanged();
  }, [menu]);

  useEffect(() => {
    setCurrentShoppingList(shoppingList);
  }, [shoppingList]);

  useEffect(() => {
    setCurrentList(currentShoppingList);
  }, [currentShoppingList]);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <PageTitle>Shopping List</PageTitle>
        <DashboardButton
          handleClick={handleShoppingList}
          icon={<CiBoxList size={17} />}
        >
          {currentShoppingList.length > 0 ? "Update List" : "Generate List"}
        </DashboardButton>
      </div>
      <div className="flex flex-col gap-2 items-center h-full bg-white rounded text-black md:items-start">
        {showMenuUpdateAlert && (
          <AlertMessage
            text="You have made changes to the meal planner, please update the
                shopping list."
            handleClick={dismissAlert}
          />
        )}
        {isLoading ? (
          <Loader />
        ) : currentShoppingList.length > 0 ? (
          <div className="mt-3 flex flex-col gap-2 border border-neutral-400 rounded px-7 py-5 w-full md:w-72">
            {currentList
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
            <button className="underline" onClick={handleShoppingList}>
              generate the shopping list
            </button>
            .
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
