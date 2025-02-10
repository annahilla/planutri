"use client";

import Week from "@/components/menu-planner/Week";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { deleteFullMenu } from "@/services/menuService";
import { useState } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MenuInterface } from "@/types/types";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";

const Menu = () => {
  const token = useAppSelector((state) => state.auth.user?.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState<MenuInterface[]>([]);

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const clearAll = () => {
    if (token) {
      deleteFullMenu(token);
      setIsModalOpen(false);
      setMenu([]);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 text-2xl md:mb-5">Meal Planner</h2>
          <button
            onClick={handleClear}
            className="p-2 bg-neutral-50 rounded text-neutral-600 text-sm hover:bg-neutral-100"
          >
            <MdOutlineCleaningServices />
          </button>
        </div>
        <Week menu={menu} setMenu={setMenu} />
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
