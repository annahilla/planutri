"use client";

import PageTitle from "@/components/ui/PageTitle";
import { LuConstruction } from "react-icons/lu";

const ShoppingList = () => {
  return (
    <div className="h-full">
      <PageTitle>Shopping List</PageTitle>
      <div className="flex flex-col items-center gap-4 justify-center h-full bg-white rounded text-black">
        <LuConstruction size={45} />
        <p className=" text-2xl">On construction</p>
      </div>
    </div>
  );
};

export default ShoppingList;
