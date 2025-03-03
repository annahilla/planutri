"use client";

import { useRecipes } from "@/context/RecipesContext";
import {
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} from "@/services/favoriteRecipeService";
import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

const FavoriteButton = ({ recipeId }: { recipeId: string | undefined }) => {
  const { favoriteRecipes } = useRecipes();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    if (!recipeId) return;

    try {
      if (isFavorite) {
        await deleteFavoriteRecipe(recipeId);
        setIsFavorite(false);
      } else {
        await addFavoriteRecipe(recipeId);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const isAlreadyFavorited = async () => {
    if (favoriteRecipes !== undefined) {
      const currentRecipe = favoriteRecipes.find(
        (favoriteRecipe) => favoriteRecipe === recipeId
      );

      if (currentRecipe) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };

  useEffect(() => {
    isAlreadyFavorited();
  }, []);

  return (
    <button className="text-red-500" onClick={handleFavorite}>
      {isFavorite ? <GoHeartFill size={20} /> : <GoHeart size={20} />}
    </button>
  );
};

export default FavoriteButton;
