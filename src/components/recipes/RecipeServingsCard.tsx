import { PiUser } from "react-icons/pi";
import RecipeInfoCard from "./RecipeInfoCard";
import useEditMode from "@/hooks/useEditMode";
import { RecipeInterface } from "@/types/types";

const RecipeServingsCard = ({
  recipe,
  servings,
  setServings,
  isRecipeCardModal = false,
}: {
  recipe: RecipeInterface;
  servings: number;
  setServings: (prev: number) => void;
  isRecipeCardModal?: boolean;
}) => {
  const { isEditMode } = useEditMode(recipe._id);

  const increase = () => {
    if (setServings) setServings(servings + 1);
  };

  const decrease = () => {
    if (setServings) {
      setServings(servings > 1 ? servings - 1 : 1);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full md:w-48">
      <RecipeInfoCard
        icon={<PiUser size={22} />}
        text="servings"
        quantity={servings}
        setServings={setServings}
        isRecipeCardModal={isRecipeCardModal}
      />
      {(isEditMode || isRecipeCardModal) && (
        <div className="absolute right-3 md:right-5 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
          <button
            onClick={increase}
            className="outline-none flex items-center justify-center w-7 h-7 text-lg text-neutral-500 border border-neutral-400 rounded-t border-b-0 hover:bg-neutral-100"
          >
            +
          </button>
          <button
            onClick={decrease}
            className="outline-none flex items-center justify-center w-7 h-7 text-lg text-neutral-500 border border-neutral-400 rounded-b hover:bg-neutral-100"
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeServingsCard;
