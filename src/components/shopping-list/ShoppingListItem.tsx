"use client";

import { useAppSelector } from "@/lib/store/reduxHooks";
import { updateShoppingList } from "@/services/shoppingListService";
import { IngredientInterface } from "@/types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

const ShoppingListItem = ({
  shoppingItem,
}: {
  shoppingItem: IngredientInterface;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [ingredientName, setIngredientName] = useState(shoppingItem.ingredient);
  const token = useAppSelector((state) => state.auth.user?.token);

  const handleOnCheckboxChange = () => {
    setIsChecked(!isChecked);

    const newIngredient = {
      ...shoppingItem,
      checked: !isChecked,
    };

    if (token) {
      updateShoppingList(newIngredient, token);
    }
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredientName(event.target.value);
  };

  const deleteItem = () => {
    console.log(1);
  };

  useEffect(() => {
    setIsChecked(shoppingItem.checked ? shoppingItem.checked : false);
  }, [shoppingItem]);

  return (
    <div
      className="flex gap-5 justify-between items-center group w-full"
      key={shoppingItem._id}
    >
      <div className="flex gap-2">
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
          <input
            onChange={handleOnInputChange}
            value={ingredientName}
            className="w-full outline-none text-neutral-800"
          />
        </div>
      </div>
      <button
        onClick={deleteItem}
        className="text-neutral-700 md:hidden md:group-hover:block"
      >
        <IoIosClose />
      </button>
    </div>
  );
};

export default ShoppingListItem;
