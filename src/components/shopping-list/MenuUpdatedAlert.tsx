"use client";

import { useEffect, useState } from "react";
import AlertMessage from "../ui/AlertMessage";
import { IngredientInterface, MenuInterface } from "@/types/types";

const MenuUpdatedAlert = ({
  menu,
  shoppingList,
}: {
  menu: MenuInterface[];
  shoppingList: IngredientInterface[];
}) => {
  const [showMenuUpdateAlert, setShowMenuUpdateAlert] = useState(false);

  const checkMenuChanges = () => {
    const lastUpdatedMenu = localStorage.getItem("lastUpdatedMenu");

    if (lastUpdatedMenu && JSON.stringify(menu) !== lastUpdatedMenu) {
      setShowMenuUpdateAlert(true);
    } else {
      setShowMenuUpdateAlert(false);
    }
  };

  const dismissAlert = () => {
    setShowMenuUpdateAlert(false);
    localStorage.setItem("lastUpdatedMenu", JSON.stringify(menu));
  };

  useEffect(() => {
    checkMenuChanges();
  }, [menu, shoppingList]);

  return (
    <>
      {showMenuUpdateAlert && (
        <AlertMessage
          text="You have made changes to the meal planner, please update the shopping list."
          handleClick={dismissAlert}
        />
      )}
    </>
  );
};

export default MenuUpdatedAlert;
