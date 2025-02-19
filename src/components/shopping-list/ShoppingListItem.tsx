"use client";

import { IngredientInterface } from "@/types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

import { useRef } from "react";

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
            <div className="flex gap-1 text-neutral-500">
              <span>{shoppingItem.quantity}</span>
              <span>{shoppingItem.unit}</span>
            </div>
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
      <button
        onClick={() => console.log(1)}
        className="text-neutral-700 md:hidden md:group-hover:hidden"
      >
        <IoIosClose />
      </button>
    </div>
  );
};

export default ShoppingListItem;
