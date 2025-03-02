"use client";

import { RecipeInterface } from "@/types/types";
import Link from "next/link";
import RecipeImage from "./RecipeImage";
import { useEffect, useState } from "react";
import ConfirmModal from "../ui/modals/ConfirmModal";
import { deleteRecipe } from "@/services/recipeService";
import { useRouter } from "next/navigation";
import { CiEdit, CiTrash } from "react-icons/ci";
import RecipeServingsCard from "./RecipeServingsCard";

const RecipeCard = ({
  recipe,
  isMenu = false,
  setMenuServings,
}: {
  recipe: RecipeInterface;
  isMenu?: boolean;
  setMenuServings: (value: number) => void;
}) => {
  const [servings, setServings] = useState(
    recipe.servings ? recipe.servings : 1
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [isRecipe, setIsRecipe] = useState(true);

  const ingredientsList = recipe.ingredients
    .map((ingredient) => ingredient.ingredient)
    .join(", ");

  const openDeleteRecipe = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setMenuServings(servings);
  }, [servings]);

  const handleDeleteRecipe = async () => {
    if (recipe && recipe._id) {
      try {
        setIsModalOpen(false);
        await deleteRecipe(recipe._id);
        setIsRecipe(false);
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
    <>
      {isRecipe && (
        <div className="border p-5 rounded h-full flex flex-col justify-between">
          {!isMenu ? (
            <>
              <Link
                className="flex flex-col gap-3 hover:opacity-80"
                href={`/dashboard/recipes/${recipe._id}`}
              >
                <RecipeImage imageUrl={recipe.imageUrl} height="h-56" />
                <h3 className="font-bold">{recipe.name}</h3>
                {recipe.isPublic && (
                  <p className="text-xs bg-beige p-1 rounded text-neutral-700 w-fit">
                    Made by planutri
                  </p>
                )}
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-neutral-800">Ingredients: </p>
                  <p className="text-sm text-neutral-500">{ingredientsList}</p>
                </div>
                {recipe.description && (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-neutral-800">Description: </p>
                    <p className="text-sm text-neutral-500 line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                )}
              </Link>
              {!recipe.isPublic && (
                <div className="flex gap-2 mt-5 text-sm items-center justify-end">
                  <button
                    className="bg-brown p-2 rounded-full text-white"
                    onClick={openRecipeEdit}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className="bg-white border border-brown p-2 rounded-full text-brown"
                    onClick={openDeleteRecipe}
                  >
                    <CiTrash />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col justify-between h-full cursor-pointer hover:opacity-80">
              <div className="flex flex-col gap-3 cursor-pointer hover:opacity-80">
                <RecipeImage imageUrl={recipe.imageUrl} height="h-56" />
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
              <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                <RecipeServingsCard
                  servings={servings}
                  setServings={setServings}
                  recipe={recipe}
                  isRecipeCardModal
                />
              </div>
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
      )}
    </>
  );
};

export default RecipeCard;
