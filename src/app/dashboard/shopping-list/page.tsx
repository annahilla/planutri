"use client";

import Loader from "@/components/ui/Loader";
import PageTitle from "@/components/ui/PageTitle";
import { fetchShoppingList } from "@/lib/store/apis/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { generateShoppingList } from "@/services/shoppingListService";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShoppingListItem from "@/components/shopping-list/ShoppingListItem";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { CiBoxList } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const ShoppingList = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.user?.token);
  const shoppingList = useAppSelector(
    (state) => state.shoppingList.shoppingList
  );
  const menu = useAppSelector((state) => state.menu.menu);
  const [currentShoppingList, setCurrentShoppingList] = useState(shoppingList);
  const [showMenuUpdateAlert, setShowMenuUpdateAlert] = useState(false);
  const isLoading = useAppSelector(
    (state) => state.shoppingList.status === "loading"
  );

  const handleShoppingList = async () => {
    if (token) {
      const { list } = await generateShoppingList(token);
      setCurrentShoppingList(list);
      dispatch(fetchShoppingList());
      setShowMenuUpdateAlert(false);
    }
  };

  const hasMenuChanged = () => {
    const savedMenu = localStorage.getItem("previousMenu");
    if (
      savedMenu &&
      JSON.stringify(JSON.parse(savedMenu)) !== JSON.stringify(menu)
    ) {
      setShowMenuUpdateAlert(true);
    }
    localStorage.setItem("previousMenu", JSON.stringify(menu));
  };

  useEffect(() => {
    dispatch(fetchShoppingList());
  }, []);

  useEffect(() => {
    hasMenuChanged();
  }, [menu]);

  useEffect(() => {
    setCurrentShoppingList(shoppingList);
  }, [shoppingList]);

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
          <div className="text-neutral-600 bg-neutral-100 w-full p-2 text-sm flex justify-between items-center border-l-4 border-neutral-300">
            <div className="flex gap-1 items-center">
              <CiCircleInfo size={21} />
              <p>
                You have made changes to the meal planner, please update the
                shopping list.
              </p>
            </div>
            <button onClick={() => setShowMenuUpdateAlert(false)}>
              <IoMdClose />
            </button>
          </div>
        )}
        {isLoading ? (
          <Loader />
        ) : currentShoppingList.length > 0 ? (
          <div className="mt-3 flex flex-col gap-2 border border-neutral-400 rounded px-7 py-5 w-full md:w-fit">
            {currentShoppingList.map((shoppingItem) => (
              <ShoppingListItem
                key={shoppingItem.ingredient}
                shoppingItem={shoppingItem}
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
