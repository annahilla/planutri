import { useRecipe } from "@/context/RecipeContext";
import useEditMode from "@/hooks/useEditMode";
import React, { ReactNode } from "react";

interface RecipeInfoInterface {
  text: string;
  icon: ReactNode;
  quantity: number;
  setServings?: (value: number) => void;
}

const RecipeInfoCard = ({
  text,
  icon,
  quantity,
  setServings,
}: RecipeInfoInterface) => {
  const { recipe } = useRecipe();
  const { isEditMode } = useEditMode(recipe._id);

  const increase = () => {
    if (setServings) setServings(quantity + 1);
  };

  const decrease = () => {
    if (setServings) setServings(quantity - 1);
  };

  return (
    <div className="flex gap-4 items-center justify-center my-6 border border-neutral-300 rounded p-3 h-24 w-full md:w-48 md:gap-6">
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="flex gap-3 items-center text-brown">
          {icon}
          <p className="text-xl font-bold">{quantity}</p>
        </span>
        <p className="tracking-wider">{text}</p>
      </div>
      {setServings && isEditMode && (
        <div className="flex flex-col items-center">
          <button
            onClick={increase}
            className="flex items-center justify-center w-7 h-7 text-lg text-neutral-500 border border-neutral-400 rounded-t border-b-0 hover:bg-neutral-100"
          >
            +
          </button>
          <button
            onClick={decrease}
            className="flex items-center justify-center w-7 h-7 text-lg text-neutral-500 border border-neutral-400 rounded-b hover:bg-neutral-100"
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeInfoCard;
