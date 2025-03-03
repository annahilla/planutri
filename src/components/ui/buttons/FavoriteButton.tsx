"use client";

import {
  addFavoriteRecipe,
  deleteFavoriteRecipe,
  getFavoriteRecipes,
} from "@/services/favoriteRecipeService";
import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

const FavoriteButton = ({ recipeId }: { recipeId: string | undefined }) => {
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
    const favoritesList = await getFavoriteRecipes();
    if (favoritesList !== undefined) {
      const currentRecipe = favoritesList.find(
        (favoriteRecipeId: string) => favoriteRecipeId === recipeId
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
    <button onClick={handleFavorite}>
      {isFavorite ? <GoHeartFill size={20} /> : <GoHeart size={20} />}
    </button>
  );
};

export default FavoriteButton;
