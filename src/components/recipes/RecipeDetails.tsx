"use client";

import Button from "../ui/buttons/Button";
import { deleteRecipe, updateRecipe } from "@/services/recipeService";
import { IngredientInterface } from "@/types/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import { validateCreateRecipeForm } from "@/utils/validation";
import IngredientInput from "./IngredientInput";
import DescriptionInput from "./DescriptionInput";
import ConfirmModal from "../ui/modals/ConfirmModal";
import RecipeImage from "./RecipeImage";
import EditRecipeImageButton from "./EditRecipeImage";
import AddButton from "../ui/buttons/AddButton";
import { PiNotebook, PiUser } from "react-icons/pi";
import RecipeInfoCard from "./RecipeInfoCard";
import { useRecipe } from "@/context/RecipeContext";
import useEditMode from "@/hooks/useEditMode";

interface RecipeDetailsProps {
  isModal?: boolean;
  closeModal?: () => void;
  clearRecipe?: (id: string) => void;
}

const RecipeDetails = ({
  isModal = false,
  closeModal,
  clearRecipe,
}: RecipeDetailsProps) => {
  const router = useRouter();
  const { recipe, discardChanges } = useRecipe();
  const { isEditMode, closeEditMode } = useEditMode({
    recipeId: recipe._id,
  });

  const [error, setError] = useState("");
  const [recipeName, setRecipeName] = useState(recipe.name);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [servings, setServings] = useState(
    recipe.servings ? recipe.servings : 1
  );
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, index) => ({
        ...ingredient,
        quantity: recipe.ingredients[index].quantity * servings,
      }))
    );
  }, [servings]);

  const saveRecipe = async () => {
    if (!recipe) return;

    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient !== ""
    );
    const emptyIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient === ""
    );

    const validationError = validateCreateRecipeForm(
      recipeName,
      ingredients,
      servings
    );
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
      _id: recipe._id,
      name: recipeName,
      ingredients: ingredientsForDB,
      servings,
      description,
    };

    try {
      await updateRecipe(updatedRecipe);
      router.push(`/dashboard/recipes/${updatedRecipe._id}?edit=false`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }

    if (isModal) {
      closeModal?.();
    } else {
      closeEditMode();
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
    if (recipe && recipe._id) {
      try {
        if (isModal) {
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

  const addIngredientInput = () => {
    const newEmptyIngredient: IngredientInterface = {
      _id: crypto.randomUUID(),
      ingredient: "",
      quantity: 0,
      unit: "g",
    };
    setIngredients((prevIngredients) => {
      return [...prevIngredients, newEmptyIngredient];
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between w-full md:w-full">
        <div className="relative">
          <RecipeImage height="h-96" imageUrl={imageUrl} />
          {isEditMode && <EditRecipeImageButton setImageUrl={setImageUrl} />}
        </div>
        <div className="flex gap-2 items-center justify-center w-full">
          <RecipeInfoCard
            icon={<PiUser size={22} />}
            text="servings"
            quantity={servings}
            setServings={setServings}
          />
          <RecipeInfoCard
            icon={<PiNotebook size={22} />}
            text="ingredients"
            quantity={ingredients.length}
          />
        </div>
        <div className="flex flex-col gap-5 md:gap-10 md:items-strech lg:flex-row">
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
        {error && <ErrorMessage message={error} />}

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
