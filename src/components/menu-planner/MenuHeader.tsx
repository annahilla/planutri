"use client";

import React, { useState } from "react";
import PageTitle from "../ui/PageTitle";
import DashboardButton from "../ui/buttons/DashboardButton";
import { CiEraser, CiShoppingBasket } from "react-icons/ci";
import { useRouter } from "next/navigation";
import ConfirmModal from "../ui/modals/ConfirmModal";
import { deleteFullMenu } from "@/services/menuService";
import { useMenu } from "@/context/MenuContext";
import DashboardHeader from "../ui/DashboardHeader";

const MenuHeader = () => {
  const { setMenu } = useMenu();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToShoppingList = () => {
    router.push("/dashboard/shopping-list");
  };

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const clearAll = async () => {
    await deleteFullMenu();
    setIsModalOpen(false);
    setMenu([]);
  };

  return (
    <DashboardHeader>
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
      <ConfirmModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleFunction={clearAll}
        text="Are you sure you want to delete the menu? The shopping list will also be deleted."
      />
    </DashboardHeader>
  );
};

export default MenuHeader;
