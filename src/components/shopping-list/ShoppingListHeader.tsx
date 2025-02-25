"use client";

import { CiBoxList } from "react-icons/ci";
import DashboardButton from "../ui/buttons/DashboardButton";
import PageTitle from "../ui/PageTitle";
import { generateShoppingList } from "@/services/shoppingListService";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { toast } from "react-toastify";
import { IngredientInterface } from "@/types/types";

const ShoppingListPageHeader = ({
  doesShoppingListExist,
  setList,
}: {
  doesShoppingListExist: boolean;
  setList: (list: IngredientInterface[]) => void;
}) => {
  const token = useAppSelector((state) => state.auth.user?.token);
  const menu = useAppSelector((state) => state.menu.menu);

  const handleShoppingList = async () => {
    if (menu.length <= 0 && !doesShoppingListExist) {
      toast.info("You can't generate a shopping list without a menu.");
    } else {
      if (token) {
        const { list } = await generateShoppingList(token);
        if (list) {
          localStorage.setItem("lastUpdatedMenu", JSON.stringify(menu));
          setList(list);
        } else {
          setList([]);
        }
        toast.success("Shopping list updated successfully!");
      } else {
        toast.error("There was an error generating the shopping list.");
      }
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 md:mb-6">
      <PageTitle>Shopping List</PageTitle>
      <DashboardButton
        handleClick={handleShoppingList}
        icon={<CiBoxList size={17} />}
      >
        {doesShoppingListExist ? "Update List" : "Generate List"}
      </DashboardButton>
    </div>
  );
};

export default ShoppingListPageHeader;
