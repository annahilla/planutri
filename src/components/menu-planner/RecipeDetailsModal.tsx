import { Recipe } from "@/types/types";
import RecipeDetails from "../recipes/RecipeDetails";
import Modal from "../ui/Modal";

interface RecipeDetailsModalProps {
  isModalOpen: boolean;
  selectedRecipe: Recipe | null;
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
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <div className="px-5 w-full">
        <RecipeDetails
          isModal={true}
          closeModal={closeModal}
          currentRecipe={selectedRecipe ?? ({} as Recipe)}
          clearRecipe={handleClearRecipe}
        />
      </div>
    </Modal>
  );
};

export default RecipeDetailsModal;
