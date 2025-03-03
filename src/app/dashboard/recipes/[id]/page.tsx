import RecipeDetails from "@/components/recipes/RecipeDetails";
import RecipeHeader from "@/components/recipes/RecipeHeader";
import { FavoriteRecipesProvider } from "@/context/FavoriteRecipesContext";
import { RecipeProvider } from "@/context/RecipeContext";
import { fecthFavoriteRecipes } from "@/services/favoriteRecipesServiceServer";
import { fetchRecipe } from "@/services/recipeServiceServer";
import React from "react";

const RecipesPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const recipe = await fetchRecipe(id);
  const favoriteRecipes = await fecthFavoriteRecipes();

  return (
    <RecipeProvider fetchedRecipe={recipe}>
      <div className="flex bg-white h-full pb-5 flex-col rounded text-black md:items-start md:w-full">
        <FavoriteRecipesProvider fetchedFavoriteRecipes={favoriteRecipes}>
          <RecipeHeader />
          <RecipeDetails recipe={recipe} />
        </FavoriteRecipesProvider>
      </div>
    </RecipeProvider>
  );
};

export default RecipesPage;
