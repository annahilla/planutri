"use client";

import Loader from "@/components/ui/Loader";
import PageTitle from "@/components/ui/PageTitle";
import { useAppSelector } from "@/lib/store/reduxHooks";
import Link from "next/link";

const ShoppingList = () => {
  const shoppingList = useAppSelector(
    (state) => state.shoppingList.shoppingList
  );
  const isLoading = useAppSelector(
    (state) => state.shoppingList.status === "loading"
  );

  return (
    <div className="h-full">
      <PageTitle>Shopping List</PageTitle>
      <div className="flex flex-col gap-2 items-center h-full bg-white rounded text-black md:items-start">
        {isLoading ? (
          <Loader />
        ) : shoppingList.length > 0 ? (
          <div className="flex flex-col gap-2 border border-neutral-400 rounded px-7 py-5 w-full md:px-10 md:w-fit">
            {shoppingList.map((shoppingItem) => (
              <div className="flex gap-2" key={shoppingItem._id}>
                <input type="checkbox" />
                <div className="flex gap-1">
                  <span>{shoppingItem.quantity}</span>
                  <span>{shoppingItem.unit}</span>
                  <span>{shoppingItem.ingredient}</span>
                </div>
              </div>
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
