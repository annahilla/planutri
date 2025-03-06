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
import MadeByTag from "../ui/MadeByTag";
import FavoriteButton from "../ui/buttons/FavoriteButton";
import { useUser } from "@/context/UserContext";
import useUsername from "@/hooks/useUsername";

const RecipeCard = ({
  recipe,
  recipes,
  isMenu = false,
  setRecipes,
  setMenuServings,
}: {
  recipe: RecipeInterface;
  recipes: RecipeInterface[];
  isMenu?: boolean;
  setMenuServings: (
    value: (prev: { [key: string]: number }[]) => { [key: string]: number }[]
  ) => void;
  setRecipes: (recipes: RecipeInterface[]) => void;
}) => {
  const { user } = useUser();
  const [servings, setServings] = useState(
    recipe.servings ? recipe.servings : 1
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const isOwnRecipe = recipe.userId === user.userId;
  const { username, loading } = useUsername(recipe);

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
        await deleteRecipe(recipe._id);
        setRecipes(
          recipes.filter(
            (deletedRecipe: RecipeInterface) => deletedRecipe._id !== recipe._id
          )
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const openRecipeEdit = () => {
    router.push(`/dashboard/recipes/${recipe._id}?edit=true`);
  };

  useEffect(() => {
    setMenuServings((prev: { [key: string]: number }[]) => {
      const existingRecipeIndex = prev.findIndex((item) => item[recipe.name]);

      if (existingRecipeIndex !== -1) {
        const updatedMenuServings = [...prev];
        updatedMenuServings[existingRecipeIndex] = { [recipe.name]: servings };
        return updatedMenuServings;
      } else {
        return [...prev, { [recipe.name]: servings }];
      }
    });
  }, [servings]);

  return (
    <div className="border p-5 rounded h-full flex flex-col justify-between">
      {!isMenu ? (
        <>
          <Link
            className="flex flex-col gap-3 hover:opacity-80"
            href={`/dashboard/recipes/${recipe._id}`}
          >
            <RecipeImage imageUrl={recipe.imageUrl} height="h-56" />
            <h3 className="font-bold text-neutral-900">{recipe.name}</h3>
            {recipe.isPublic && (
              <MadeByTag isLoading={loading} name={username || "unknown"} />
            )}
            <div className="flex flex-col gap-1">
              <p className="text-sm text-neutral-800">Ingredients: </p>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {ingredientsList}
              </p>
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
          <div className="flex justify-between items-center w-full mt-5">
            <FavoriteButton recipeId={recipe._id} />
            {isOwnRecipe && (
              <div className="flex gap-2 text-sm items-center">
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
          </div>
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
  );
};

export default RecipeCard;
