"use client";

import { IngredientInterface } from "@/types/types";
import { ChangeEvent, useEffect, useState } from "react";

import { useRef } from "react";
import IngredientQuantityAndUnit from "../IngredientQuantityAndUnit";

const ShoppingListItem = ({
  shoppingItem,
  onCheckboxChange,
}: {
  shoppingItem: IngredientInterface;
  onCheckboxChange: (updatedItem: IngredientInterface) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [ingredientName, setIngredientName] = useState(shoppingItem.ingredient);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleOnCheckboxChange = () => {
    setIsChecked(!isChecked);
    const newIngredient = { ...shoppingItem, checked: !isChecked };
    onCheckboxChange(newIngredient);
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredientName(event.target.value);
  };

  useEffect(() => {
    setIsChecked(shoppingItem.checked ? shoppingItem.checked : false);
  }, [shoppingItem]);

  return (
    <div
      className={`flex gap-5 justify-between items-center group w-full shopping-item transition-all duration-300 ease-in-out ${
        isChecked ? "translate-y-2 opacity-50" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="relative flex gap-2 px-1 w-fit">
        <input
          onChange={handleOnCheckboxChange}
          className="accent-black"
          type="checkbox"
          value={shoppingItem._id}
          checked={isChecked}
        />
        <div className="flex justify-start gap-2">
          {shoppingItem.quantity && shoppingItem.unit && (
            <IngredientQuantityAndUnit ingredient={shoppingItem} />
          )}
          <span ref={textRef} className="absolute invisible whitespace-pre">
            {ingredientName}
          </span>
          <input
            onChange={handleOnInputChange}
            value={ingredientName}
            className="outline-none text-neutral-800"
            style={{ width: textRef.current?.offsetWidth || "auto" }}
          />
        </div>
        {isChecked && (
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-600"></div>
        )}
      </div>
    </div>
  );
};

export default ShoppingListItem;
