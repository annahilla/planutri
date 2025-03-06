"use client";

import { useFavoriteRecipes } from "@/context/FavoriteRecipesContext";
import {
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} from "@/services/favoriteRecipeService";
import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

const FavoriteButton = ({ recipeId }: { recipeId: string | undefined }) => {
  const { favoriteRecipes } = useFavoriteRecipes();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    if (!recipeId) return;

    try {
      if (isFavorite) {
        setIsFavorite(false);
        await deleteFavoriteRecipe(recipeId);
      } else {
        setIsFavorite(true);
        await addFavoriteRecipe(recipeId);
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
