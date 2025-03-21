"use client";

import Button from "../../ui/buttons/Button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ErrorMessage from "../../ui/ErrorMessage";
import IngredientInput from "./IngredientInput";
import DescriptionInput from "./DescriptionInput";
import ConfirmModal from "../../ui/modals/ConfirmModal";
import RecipeImage from "../images/RecipeImage";
import EditRecipeImageButton from "../images/EditRecipeImage";
import AddButton from "../../ui/buttons/AddButton";
import { PiNotebook } from "react-icons/pi";
import RecipeInfoCard from "./RecipeInfoCard";
import { useRecipe } from "@/context/RecipeContext";
import useEditMode from "@/hooks/useEditMode";
import useEditRecipeIngredients from "@/hooks/useEditRecipeIngredients";
import useSaveRecipe from "@/hooks/useSaveRecipe";
import useConfirmDelete from "@/hooks/useConfirmDelete";
import { Meal, RecipeInterface } from "@/types/types";
import RecipeServingsCard from "./RecipeServingsCard";
import FilterTagItem from "../recipes-list/toolbar/FilterTagItem";
import MealTags from "../recipes-list/toolbar/MealTags";
import { ToggleSwitch } from "../../ui/ToggleSwitch";
import { useUser } from "@/context/UserContext";

interface RecipeDetailsProps {
  recipe: RecipeInterface;
  isModal?: boolean;
  closeModal?: () => void;
  clearRecipe?: (id: string) => void;
  menuServings?: number;
}

const RecipeDetails = ({
  recipe,
  isModal = false,
  closeModal,
  clearRecipe,
  menuServings,
}: RecipeDetailsProps) => {
  const { isOwnRecipe } = useRecipe();
  const { user } = useUser();
  const ownRecipe = recipe.userId === user.userId;
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { discardChanges, username } = useRecipe();
  const { isEditMode } = useEditMode(recipe._id);
  const { ingredients, addIngredientInput, deleteIngredient, setIngredients } =
    useEditRecipeIngredients(recipe.ingredients, setError);

  const { openDeleteRecipe, handleDeleteRecipe, isModalOpen, setIsModalOpen } =
    useConfirmDelete(closeModal, clearRecipe);

  const [recipeName, setRecipeName] = useState(recipe.name);
  const [description, setDescription] = useState(recipe.description);

  const [servings, setServings] = useState(
    menuServings || recipe.servings || 1
  );
  const [meals, setMeals] = useState<Meal[]>([]);
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl);
  const [isPublic, setIsPublic] = useState(recipe.isPublic || false);

  const { saveRecipe } = useSaveRecipe(
    recipe._id,
    recipeName,
    description,
    ingredients,
    servings,
    meals,
    isPublic,
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

  if (recipe && isEditMode && !isOwnRecipe) {
    router.replace(window.location.pathname);
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between w-full md:w-full">
        <div className="relative">
          <RecipeImage height="h-64 md:h-96" imageUrl={imageUrl} />
          {isEditMode && <EditRecipeImageButton setImageUrl={setImageUrl} />}
        </div>

        <div className="flex items-center justify-center w-full my-6">
          {isEditMode ? (
            <div className="flex flex-col gap-6 items-center justify-between w-full md:gap-2 md:flex-row mb-4">
              <div className="flex justify-center flex-wrap">
                <MealTags
                  meals={recipe.meals}
                  setMeals={setMeals}
                  isSnap={false}
                />
              </div>
              <div className="flex gap-2">
                <ToggleSwitch
                  isOn={isPublic}
                  setIsOn={() => setIsPublic(!isPublic)}
                />
                <p>Public</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-6 items-start justify-between gap-2 w-full md:items-center">
              <div className="flex justify-start gap-2 flex-wrap md:justify-center">
                {recipe.meals &&
                  recipe.meals.map((meal) => (
                    <FilterTagItem key={meal} isActive isStatic>
                      {meal}
                    </FilterTagItem>
                  ))}
              </div>
              <div className="text-center text-neutral-500 w-28">
                {!isModal && (
                  <div className="flex items-center justify-center rounded-full bg-neutral-100 h-8">
                    {isOwnRecipe || ownRecipe ? (
                      recipe.isPublic ? (
                        "Public"
                      ) : (
                        "Private"
                      )
                    ) : (
                      <button>{username}</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center justify-center w-full">
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

        <div className="flex flex-col gap-5 mt-4 md:gap-10 md:items-start lg:flex-row h-full md:mt-8">
          <div className="lg:max-w-80 xl:max-w-96">
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
            <div className="w-full mt-6 md:mt-0">
              <h5 className="text-xl mb-3">Ingredients</h5>
              <ul
                className={`flex flex-col gap-3 rounded ${
                  isEditMode ? "bg-white" : "bg-beige p-5"
                }`}
              >
                {ingredients !== undefined &&
                  ingredients?.map((ingredient, index) => (
                    <IngredientInput
                      key={ingredient._id || ingredient.ingredient}
                      index={index}
                      ingredients={ingredients}
                      ingredient={ingredient}
                      setIngredients={setIngredients}
                      setError={setError}
                      menuServings={menuServings}
                      recipe={recipe}
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
