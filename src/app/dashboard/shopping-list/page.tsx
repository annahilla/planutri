"use client";

import Loader from "@/components/ui/Loader";
import PageTitle from "@/components/ui/PageTitle";
import { fetchShoppingList } from "@/lib/store/apis/shoppingListSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { generateShoppingList } from "@/services/shoppingListService";
import Link from "next/link";
import { useEffect } from "react";
import ShoppingListItem from "./ShoppingListItem";

const ShoppingList = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.user?.token);
  const shoppingList = useAppSelector(
    (state) => state.shoppingList.shoppingList
  );
  const isLoading = useAppSelector(
    (state) => state.shoppingList.status === "loading"
  );

  useEffect(() => {
    if (token) {
      generateShoppingList(token);
    }
    dispatch(fetchShoppingList());
  }, []);

  return (
    <div className="h-full">
      <PageTitle>Shopping List</PageTitle>
      <div className="flex flex-col gap-2 items-center h-full bg-white rounded text-black md:items-start">
        {isLoading ? (
          <Loader />
        ) : shoppingList.length > 0 ? (
          <div className="mt-3 flex flex-col gap-2 border border-neutral-400 rounded px-7 py-5 w-full md:w-fit">
            {shoppingList.map((shoppingItem) => (
              <ShoppingListItem
                key={shoppingItem._id}
                shoppingItem={shoppingItem}
              />
            ))}
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
