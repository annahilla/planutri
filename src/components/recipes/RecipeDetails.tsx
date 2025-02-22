"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import Button from "../ui/buttons/Button";
import { deleteRecipe, updateRecipe } from "@/services/recipeService";
import { RecipeInterface } from "@/types/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import { validateCreateRecipeForm } from "@/utils/validation";
import { fetchRecipes } from "@/lib/store/apis/recipeSlice";
import IngredientInput from "./IngredientInput";
import DescriptionInput from "./DescriptionInput";
import ConfirmModal from "../ui/modals/ConfirmModal";
import RecipeImage from "./RecipeImage";

interface RecipeDetailsProps {
  currentRecipe: RecipeInterface;
  isModal?: boolean;
  editMode?: boolean;
  closeModal?: () => void;
  clearRecipe?: (id: string) => void;
  setIsEditMode?: (prev: boolean) => void;
}

const RecipeDetails = ({
  currentRecipe,
  isModal = false,
  editMode = false,
  closeModal,
  clearRecipe,
  setIsEditMode,
}: RecipeDetailsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const [recipeName, setRecipeName] = useState(currentRecipe.name);
  const [description, setDescription] = useState(currentRecipe.description);
  const [ingredients, setIngredients] = useState(currentRecipe.ingredients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.user?.token);

  const saveRecipe = async () => {
    if (!currentRecipe) return;

    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient !== ""
    );
    const emptyIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient === ""
    );

    const validationError = validateCreateRecipeForm(recipeName, ingredients);
    if (validationError) {
      setError(validationError);
      return;
    }

    emptyIngredients.map((ingredient) => deleteIngredient(ingredient._id!));
    const ingredientsForDB = updatedIngredients.map((ingredient) => {
      const { ...rest } = ingredient;
      return rest;
    });

    const updatedRecipe = {
      _id: currentRecipe._id,
      name: recipeName,
      ingredients: ingredientsForDB,
      description,
    };

    try {
      if (token) {
        await updateRecipe(updatedRecipe, token);
        dispatch(fetchRecipes());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }

    if (isModal) {
      closeModal?.();
    } else if (setIsEditMode) {
      setIsEditMode(false);
    }
  };

  const changeRecipeName = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
    setError("");
  };

  const deleteIngredient = (id: string) => {
    if (ingredients.length <= 1) {
      setError("You can't delete all ingredients");
      return;
    }
    setError("");
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient._id !== id)
    );
  };

  const openDeleteRecipe = () => {
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = async () => {
    if (currentRecipe && currentRecipe._id) {
      try {
        if (isModal) {
          clearRecipe?.(currentRecipe._id);
          closeModal?.();
        } else {
          router.push("/dashboard/recipes");
        }
        if (token) {
          await deleteRecipe(currentRecipe._id, token);
          dispatch(fetchRecipes());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between w-full md:w-full">
        <div className="mb-6">
          <RecipeImage height="h-96" recipe={currentRecipe} />
        </div>
        <div className="flex flex-col gap-5 md:gap-10 md:items-strech lg:flex-row">
          <div className="flex-shrink lg:max-w-80 xl:max-w-96">
            {editMode && (
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
            <IngredientInput
              ingredients={ingredients}
              setIngredients={setIngredients}
              setError={setError}
              editMode={editMode}
            />
          </div>
          <DescriptionInput
            description={description}
            setDescription={setDescription}
            editMode={editMode}
          />
        </div>
        {error && <ErrorMessage message={error} />}

        {editMode && (
          <div
            className={`flex gap-4 mt-7 items-center justify-center w-full md:justify-start lg:mt-16`}
          >
            <Button handleClick={saveRecipe} color="white" filled type="button">
              Save
            </Button>
            {currentRecipe && currentRecipe._id && (
              <Button handleClick={openDeleteRecipe} type="button">
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
      {isModalOpen && (
        <ConfirmModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleFunction={handleDeleteRecipe}
          text="Are you sure you want to delete this recipe?"
        />
      )}
    </div>
  );
};

export default RecipeDetails;
