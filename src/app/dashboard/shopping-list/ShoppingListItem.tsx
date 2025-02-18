"use client";

import { useAppSelector } from "@/lib/store/reduxHooks";
import { updateShoppingList } from "@/services/shoppingListService";
import { IngredientInterface } from "@/types/types";
import { useEffect, useState } from "react";

const ShoppingListItem = ({
  shoppingItem,
}: {
  shoppingItem: IngredientInterface;
}) => {
  const [isChecked, setIsChecked] = useState(
    shoppingItem.checked ? shoppingItem.checked : false
  );
  const [ingredient, setIngredient] = useState(shoppingItem);
  const token = useAppSelector((state) => state.auth.user?.token);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setIngredient((prev) => ({ ...prev, checked: !isChecked }));
  };

  useEffect(() => {
    if (token) {
      updateShoppingList(ingredient, token);
    }
  }, [isChecked]);

  return (
    <div className="flex gap-2" key={shoppingItem._id}>
      <input
        onChange={handleOnChange}
        className="accent-black"
        type="checkbox"
        value={shoppingItem._id}
        checked={isChecked}
      />
      <div className="flex gap-2">
        <div className="flex gap-1 text-neutral-500">
          <span>{shoppingItem.quantity}</span>
          <span>{shoppingItem.unit}</span>
        </div>
        <span className="text-neutral-800">{shoppingItem.ingredient}</span>
      </div>
    </div>
  );
};

export default ShoppingListItem;
