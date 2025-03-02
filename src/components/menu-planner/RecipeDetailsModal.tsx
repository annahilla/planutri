"use client";

import { RecipeInterface } from "@/types/types";
import RecipeDetails from "../recipes/RecipeDetails";
import Modal from "../ui/Modal";

interface RecipeDetailsModalProps {
  isModalOpen: boolean;
  selectedRecipe: RecipeInterface | null;
  handleClearRecipe: (id: string) => void;
  closeModal: () => void;
}

const RecipeDetailsModal = ({
  isModalOpen,
  selectedRecipe,
  handleClearRecipe,
  closeModal,
}: RecipeDetailsModalProps) => {
  return (
    <Modal isSmall={false} isOpen={isModalOpen} closeModal={closeModal}>
      <div className="px-5 w-full">
        <RecipeDetails
          isModal={true}
          closeModal={closeModal}
          recipe={selectedRecipe ?? ({} as RecipeInterface)}
          clearRecipe={handleClearRecipe}
        />
      </div>
    </Modal>
  );
};

export default RecipeDetailsModal;
