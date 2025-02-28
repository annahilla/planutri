"use client";

import { CiBoxList } from "react-icons/ci";
import DashboardButton from "../ui/buttons/DashboardButton";
import PageTitle from "../ui/PageTitle";
import { generateShoppingList } from "@/services/shoppingListService";
import { toast } from "react-toastify";
import { IngredientInterface, MenuInterface } from "@/types/types";

interface ShoppingListPageHeaderProps {
  setList: (list: IngredientInterface[]) => void;
  dismissAlert: () => void;
  menu: MenuInterface[];
  shoppingList: IngredientInterface[];
}

const ShoppingListPageHeader = ({
  setList,
  dismissAlert,
  menu,
  shoppingList,
}: ShoppingListPageHeaderProps) => {
  const handleShoppingList = async () => {
    if (menu.length === 0 && shoppingList.length === 0) {
      toast.info("You can't generate a shopping list without a menu.");
      return;
    }

    try {
      const { list } = await generateShoppingList();

      if (list) {
        setList(list);
        toast.success("Shopping list updated successfully");
      } else {
        setList([]);
      }
      dismissAlert();
    } catch (error) {
      console.error("Error generating shopping list:", error);
      toast.error("An error occurred while generating the shopping list.");
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 md:mb-6">
      <PageTitle>Shopping List</PageTitle>
      <DashboardButton
        handleClick={handleShoppingList}
        icon={<CiBoxList size={17} />}
      >
        {shoppingList.length > 0 ? "Update List" : "Generate List"}
      </DashboardButton>
    </div>
  );
};

export default ShoppingListPageHeader;
