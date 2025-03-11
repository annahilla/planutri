"use client";

import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import DashboardButton from "../ui/buttons/DashboardButton";
import { CiEdit } from "react-icons/ci";
import { useRecipe } from "@/context/RecipeContext";
import ConfirmModal from "../ui/modals/ConfirmModal";
import useEditMode from "@/hooks/useEditMode";
import { useRouter } from "next/navigation";
import FavoriteButton from "../ui/buttons/FavoriteButton";

const RecipeHeader = () => {
  const { isOwnRecipe } = useRecipe();
  const router = useRouter();
  const { recipe, setDiscardChanges } = useRecipe();
  const { isEditMode, openEditMode, closeEditMode } = useEditMode(recipe._id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goBack = () => {
    closeEditMode();
    setDiscardChanges(true);
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    if (isEditMode) {
      setIsModalOpen(true);
    } else {
      router.push("/dashboard/recipes");
    }
  };

  return (
    <div className="flex justify-between mb-5 w-full">
      <div className="flex gap-3 items-center">
        <button
          onClick={handleBackClick}
          className="text-lightBrown outline-none hover:opacity-80"
        >
          <IoMdArrowBack size={24} />
        </button>
        <h2 className="text-2xl">{recipe.name}</h2>
      </div>
      <div className="flex items-center gap-4">
        {!isEditMode && isOwnRecipe && (
          <DashboardButton handleClick={openEditMode} icon={<CiEdit />}>
            Edit
          </DashboardButton>
        )}
        <FavoriteButton recipeId={recipe._id} />
      </div>
      <ConfirmModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        text="Are you sure you want to go back? Any changes made won't be saved"
        handleFunction={goBack}
      />
    </div>
  );
};

export default RecipeHeader;
