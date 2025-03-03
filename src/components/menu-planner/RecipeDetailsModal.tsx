"use client";

import { DayOfTheWeek, Meal, RecipeInterface } from "@/types/types";
import RecipeDetails from "../recipes/RecipeDetails";
import Modal from "../ui/Modal";
import { useMenu } from "@/context/MenuContext";
import Link from "next/link";

interface RecipeDetailsModalProps {
  dayOfTheWeek: DayOfTheWeek;
  meal: Meal;
  isModalOpen: boolean;
  selectedRecipe: RecipeInterface | null;
  handleClearRecipe: (id: string) => void;
  closeModal: () => void;
}

const RecipeDetailsModal = ({
  dayOfTheWeek,
  meal,
  isModalOpen,
  selectedRecipe,
  handleClearRecipe,
  closeModal,
}: RecipeDetailsModalProps) => {
  const { menu } = useMenu();

  const currentRecipeServings = menu.find(
    (menuItem) =>
      menuItem.recipe === selectedRecipe?._id &&
      menuItem.dayOfTheWeek === dayOfTheWeek &&
      menuItem.meal === meal
  )?.servings;

  return (
    <Modal isSmall={false} isOpen={isModalOpen} closeModal={closeModal}>
      <div className="px-5 w-full">
        <div className="mb-3">
          <Link
            href={`/dashboard/recipes/${selectedRecipe?._id}`}
            className="text-2xl"
          >
            {selectedRecipe?.name}
          </Link>
        </div>
        <RecipeDetails
          isModal={true}
          closeModal={closeModal}
          recipe={selectedRecipe ?? ({} as RecipeInterface)}
          clearRecipe={handleClearRecipe}
          menuServings={currentRecipeServings}
        />
      </div>
    </Modal>
  );
};

export default RecipeDetailsModal;
