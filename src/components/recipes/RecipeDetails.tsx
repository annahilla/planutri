"use client";

import Button from "../ui/buttons/Button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import IngredientInput from "./IngredientInput";
import DescriptionInput from "./DescriptionInput";
import ConfirmModal from "../ui/modals/ConfirmModal";
import RecipeImage from "./RecipeImage";
import EditRecipeImageButton from "./EditRecipeImage";
import AddButton from "../ui/buttons/AddButton";
import { PiNotebook } from "react-icons/pi";
import RecipeInfoCard from "./RecipeInfoCard";
import { useRecipe } from "@/context/RecipeContext";
import useEditMode from "@/hooks/useEditMode";
import useEditRecipeIngredients from "@/hooks/useEditRecipeIngredients";
import useSaveRecipe from "@/hooks/useSaveRecipe";
import useConfirmDelete from "@/hooks/useConfirmDelete";
import { RecipeInterface } from "@/types/types";
import RecipeServingsCard from "./RecipeServingsCard";

interface RecipeDetailsProps {
  recipe: RecipeInterface;
  isModal?: boolean;
  closeModal?: () => void;
  clearRecipe?: (id: string) => void;
}

const RecipeDetails = ({
  recipe,
  isModal = false,
  closeModal,
  clearRecipe,
}: RecipeDetailsProps) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const { discardChanges } = useRecipe();
  const { isEditMode } = useEditMode(recipe._id);
  const { ingredients, addIngredientInput, deleteIngredient, setIngredients } =
    useEditRecipeIngredients(recipe.ingredients, setError);

  const { openDeleteRecipe, handleDeleteRecipe, isModalOpen, setIsModalOpen } =
    useConfirmDelete(closeModal, clearRecipe);

  const [recipeName, setRecipeName] = useState(recipe.name);
  const [description, setDescription] = useState(recipe.description);

  const [servings, setServings] = useState(
    recipe.servings ? recipe.servings : 1
  );
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl);

  const { saveRecipe } = useSaveRecipe(
    recipe._id,
    recipeName,
    description,
    ingredients,
    servings,
    deleteIngredient,
    isModal,
    setError,
    closeModal
  );

  const changeRecipeName = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
    setError("");
  };

  useEffect(() => {
    if (discardChanges) {
      setIngredients(recipe.ingredients);
      setRecipeName(recipe.name);
      setDescription(recipe.description);
    }
  }, [discardChanges, recipe]);

  if (recipe && isEditMode && recipe.isPublic) {
    router.replace(window.location.pathname);
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between w-full md:w-full">
        <div className="relative">
          <RecipeImage height="h-96" imageUrl={imageUrl} />
          {isEditMode && <EditRecipeImageButton setImageUrl={setImageUrl} />}
        </div>
        <div className="flex gap-2 my-6 items-center justify-center w-full">
          <RecipeServingsCard
            servings={servings}
            setServings={setServings}
            recipe={recipe}
          />
          <RecipeInfoCard
            icon={<PiNotebook size={22} />}
            text="ingredients"
            quantity={ingredients.length}
          />
        </div>
        <div className="flex flex-col gap-5 mt-4 md:gap-10 md:items-strech lg:flex-row">
          <div className="flex-shrink lg:max-w-80 xl:max-w-96">
            {isEditMode && (
              <div className="mb-7">
                <h5 className="text-xl mb-4">Recipe Name</h5>
                <input
                  className="border py-2 px-4 rounded outline-none w-full"
                  type="text"
                  value={recipeName}
                  name="name"
                  onChange={changeRecipeName}
                />
              </div>
            )}
            <div className="w-full">
              <h5 className="text-xl mb-3">Ingredients</h5>
              <ul
                className={`flex flex-col gap-3 rounded ${
                  isEditMode ? "bg-white" : "bg-beige p-5"
                }`}
              >
                {ingredients.map((ingredient, index) => (
                  <IngredientInput
                    key={ingredient._id || ingredient.ingredient}
                    index={index}
                    ingredients={ingredients}
                    ingredient={ingredient}
                    setIngredients={setIngredients}
                    setError={setError}
                  />
                ))}
              </ul>
              {isEditMode && (
                <div className="mt-8">
                  <AddButton
                    item="ingredient"
                    handleClick={addIngredientInput}
                  />
                </div>
              )}
            </div>
          </div>
          <DescriptionInput
            description={description}
            setDescription={setDescription}
          />
        </div>
        <div className="mt-10">{error && <ErrorMessage message={error} />}</div>

        {isEditMode && (
          <div
            className={`flex gap-4 mt-7 items-center justify-center w-full md:justify-start lg:mt-16`}
          >
            <Button handleClick={saveRecipe} color="white" filled type="button">
              Save
            </Button>
            {recipe && recipe._id && (
              <Button handleClick={openDeleteRecipe} type="button">
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
      <ConfirmModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleFunction={handleDeleteRecipe}
        text="Are you sure you want to delete this recipe?"
      />
    </div>
  );
};

export default RecipeDetails;
