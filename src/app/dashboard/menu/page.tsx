"use client";

import Week from "@/components/menu-planner/Week";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { deleteFullMenu } from "@/services/menuService";
import { useState } from "react";
import PageTitle from "@/components/ui/PageTitle";
import { setMenu } from "@/lib/store/apis/menuSlice";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { BsEraser } from "react-icons/bs";
import Loader from "@/components/ui/Loader";
import { CiBoxList } from "react-icons/ci";
import {
  deleteShoppingList,
  generateShoppingList,
} from "@/services/shoppingListService";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";

const Menu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.user?.token);
  const isLoading = useAppSelector((state) => state.menu.status) === "loading";

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const clearAll = async () => {
    if (token) {
      const isDeleted = await deleteFullMenu(token);
      await deleteShoppingList(token);
      setIsModalOpen(false);
      if (isDeleted) {
        dispatch(setMenu({ menu: [] }));
      }
    }
  };

  const handleGenerateShoppingList = () => {
    if (token) {
      generateShoppingList(token);
      router.push("/dashboard/shopping-list");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <PageTitle>Meal Planner</PageTitle>
          <div className="flex items-center gap-2">
            <DashboardButton
              handleClick={handleGenerateShoppingList}
              icon={<CiBoxList size={17} />}
            >
              Shopping List
            </DashboardButton>
            <DashboardButton
              handleClick={handleClear}
              icon={<BsEraser size={17} />}
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
        text="Are you sure you want to delete the menu?"
      />
    </>
  );
};

export default Menu;
