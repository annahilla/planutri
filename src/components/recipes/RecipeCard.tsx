"use client";

import { RecipeInterface } from "@/types/types";
import Link from "next/link";
import Button from "../ui/buttons/Button";
import RecipeImage from "./RecipeImage";
import { useState } from "react";
import ConfirmModal from "../ui/modals/ConfirmModal";
import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { deleteRecipe } from "@/services/recipeService";
import { fetchRecipes } from "@/lib/store/apis/recipeSlice";
import { useRouter } from "next/navigation";

const RecipeCard = ({
  recipe,
  showLinks = true,
}: {
  recipe: RecipeInterface;
  showLinks?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.user?.token);
  const router = useRouter();

  const ingredientsList = recipe.ingredients
    .map((ingredient) => ingredient.ingredient)
    .join(", ");

  const openDeleteRecipe = () => {
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = async () => {
    if (recipe && recipe._id) {
      try {
        setIsModalOpen(false);

        if (token) {
          await deleteRecipe(recipe._id, token);
          dispatch(fetchRecipes());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const openRecipeEdit = () => {
    router.push(`/dashboard/recipes/${recipe._id}?edit=true`);
  };

  return (
    <div className="border p-5 rounded h-full flex flex-col justify-between">
      {showLinks ? (
        <>
          <Link
            className="flex flex-col gap-3 hover:opacity-80"
            href={`/dashboard/recipes/${recipe._id}`}
          >
            <RecipeImage height="h-56" recipe={recipe} />
            <h3 className="font-bold">{recipe.name}</h3>
            <div className="flex flex-col gap-1">
              <p className="text-sm">Ingredients: </p>
              <p className="text-sm text-neutral-700">{ingredientsList}</p>
            </div>
            {recipe.description && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Description: </p>
                <p className="text-sm text-neutral-700 line-clamp-2">
                  {recipe.description}
                </p>
              </div>
            )}
          </Link>
          <div className="flex gap-2 mt-5 text-sm">
            <Button handleClick={openRecipeEdit} color="white" filled>
              Edit
            </Button>
            <Button handleClick={openDeleteRecipe}>Delete</Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3 cursor-pointer hover:opacity-80">
          <RecipeImage height="h-56" recipe={recipe} />
          <h3 className="font-bold">{recipe.name}</h3>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Ingredients: </p>
            <p className="text-sm text-neutral-700">{ingredientsList}</p>
          </div>
          {recipe.description && (
            <div className="flex flex-col gap-1">
              <p className="text-sm">Description: </p>
              <p className="text-sm text-neutral-700 line-clamp-2">
                {recipe.description}
              </p>
            </div>
          )}
        </div>
      )}
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

export default RecipeCard;
