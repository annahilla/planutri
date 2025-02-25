"use client";

import Week from "@/components/menu-planner/Week";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { deleteFullMenu } from "@/services/menuService";
import { useEffect, useState } from "react";
import PageTitle from "@/components/ui/PageTitle";
import { fetchMenu, setMenu } from "@/lib/store/apis/menuSlice";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { CiEraser } from "react-icons/ci";
import Loader from "@/components/ui/Loader";
import { CiShoppingBasket } from "react-icons/ci";
import { deleteShoppingList } from "@/services/shoppingListService";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";
import { fetchRecipes } from "@/lib/store/apis/recipeSlice";

const Menu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.user?.token);
  const isLoading = useAppSelector((state) => state.menu.status) === "loading";
  const shoppingList = useAppSelector(
    (state) => state.shoppingList.shoppingList
  );

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const clearAll = async () => {
    if (token) {
      const isDeleted = await deleteFullMenu(token);
      if (shoppingList.length > 0) {
        await deleteShoppingList(token);
      }
      setIsModalOpen(false);
      if (isDeleted) {
        dispatch(setMenu({ menu: [] }));
      }
    }
  };

  const goToShoppingList = () => {
    router.push("/dashboard/shopping-list");
  };

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <PageTitle>Meal Planner</PageTitle>
          <div className="flex items-center gap-2">
            <DashboardButton
              handleClick={goToShoppingList}
              icon={<CiShoppingBasket size={17} />}
            >
              Go to Shopping List
            </DashboardButton>
            <DashboardButton
              handleClick={handleClear}
              icon={<CiEraser size={17} />}
            >
              Clear All
            </DashboardButton>
          </div>
        </div>
        <Week />
      </div>
      <ConfirmModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleFunction={clearAll}
        text="Are you sure you want to delete the menu? The shopping list will also be deleted."
      />
    </>
  );
};

export default Menu;
