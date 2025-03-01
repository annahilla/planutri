"use client";

import { useRecipe } from "@/context/RecipeContext";
import { deleteRecipe } from "@/services/recipeService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useConfirmDelete = (closeModal?: () => void, clearRecipe?: (id: string) => void) => {
    const { recipe } = useRecipe();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteRecipe = () => {
    setIsModalOpen(true);
  };

    const handleDeleteRecipe = async () => {
    if (recipe && recipe._id) {
      try {
        if (isModalOpen) {
          clearRecipe?.(recipe._id);
          closeModal?.();
        } else {
          router.push("/dashboard/recipes");
        }
        await deleteRecipe(recipe._id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return { isModalOpen, setIsModalOpen, openDeleteRecipe, handleDeleteRecipe };
}

export default useConfirmDelete;