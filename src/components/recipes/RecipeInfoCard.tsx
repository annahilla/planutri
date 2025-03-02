import React, { ReactNode } from "react";

interface RecipeInfoInterface {
  text: string;
  icon: ReactNode;
  quantity: number;
  setServings?: (value: number) => void;
  isRecipeCardModal?: boolean;
  isEditMode?: boolean;
}

const RecipeInfoCard = ({
  text,
  icon,
  quantity,
  isRecipeCardModal = false,
  isEditMode = false,
}: RecipeInfoInterface) => {
  return (
    <div
      className={`flex gap-4 items-center border border-neutral-300 rounded p-3  w-full ${
        isRecipeCardModal
          ? "px-10 py-6"
          : "justify-center h-24 md:w-48 md:gap-6"
      } 
      ${text === "servings" && isEditMode && "pr-8"}
      `}
    >
      <div
        className={`flex items-center justify-center ${
          isRecipeCardModal ? "gap-4" : "flex-col gap-1"
        }`}
      >
        <span
          className={`flex items-center text-brown ${
            isRecipeCardModal ? "gap-2" : "gap-3"
          }`}
        >
          {icon}
          <p className="text-xl font-bold">{quantity}</p>
        </span>
        <p className="tracking-wider">{text}</p>
      </div>
    </div>
  );
};

export default RecipeInfoCard;
