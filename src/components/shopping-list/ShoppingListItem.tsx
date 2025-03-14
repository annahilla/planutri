"use client";

import { IngredientInterface } from "@/types/types";
import { useEffect, useState } from "react";

const ShoppingListItem = ({
  shoppingItem,
  onCheckboxChange,
}: {
  shoppingItem: IngredientInterface;
  onCheckboxChange: (updatedItem: IngredientInterface) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnCheckboxChange = () => {
    console.log(shoppingItem);
    setIsChecked(!isChecked);
    const newIngredient = { ...shoppingItem, checked: !isChecked };
    onCheckboxChange(newIngredient);
  };

  useEffect(() => {
    setIsChecked(shoppingItem.checked ? shoppingItem.checked : false);
  }, [shoppingItem]);

  return (
    <div
      className={`flex gap-5 justify-between items-center group w-full shopping-item transition transition-all duration-300 ease-in-out ${
        isChecked ? "translate-y-2 opacity-50" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="relative flex gap-2 px-1 w-fit">
        <input
          onChange={handleOnCheckboxChange}
          className="accent-black outline-none"
          type="checkbox"
          value={shoppingItem._id}
          checked={isChecked}
        />
        <div className="flex gap-2 w-full">
          <div className="flex gap-1 text-neutral-500">
            <span>{shoppingItem.quantity}</span>
            <span>{shoppingItem.unit}</span>
          </div>
          <span className="text-neutral-800 w-full">
            {shoppingItem.ingredient}
          </span>
        </div>
        {isChecked && (
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-600"></div>
        )}
      </div>
    </div>
  );
};

export default ShoppingListItem;
