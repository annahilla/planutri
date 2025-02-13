"use client";

import Week from "@/components/menu-planner/Week";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { deleteFullMenu } from "@/services/menuService";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import PageTitle from "@/components/ui/PageTitle";
import { setMenu } from "@/lib/store/menu/menuSlice";
import DashboardButton from "@/components/ui/DashboardButton";
import { BsEraser } from "react-icons/bs";

const Menu = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.user?.token);

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const clearAll = async () => {
    if (token) {
      const isDeleted = await deleteFullMenu(token);
      setIsModalOpen(false);
      if (isDeleted) {
        dispatch(setMenu({ menu: [] }));
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <PageTitle>Meal Planner</PageTitle>
          <DashboardButton
            handleClick={handleClear}
            icon={<BsEraser size={17} />}
          >
            Clear All
          </DashboardButton>
        </div>
        <Week />
      </div>
      <DeleteConfirmationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDelete={clearAll}
        thingToDelete="the menu"
      />
    </>
  );
};

export default Menu;
