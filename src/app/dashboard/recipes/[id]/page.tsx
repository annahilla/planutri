import RecipeDetails from "@/components/recipes/recipe/RecipeDetails";
import RecipeHeader from "@/components/recipes/recipe/RecipeHeader";
import { FavoriteRecipesProvider } from "@/context/FavoriteRecipesContext";
import { RecipeProvider } from "@/context/RecipeContext";
import { fecthFavoriteRecipes } from "@/services/favoriteRecipesServiceServer";
import { fetchIngredients } from "@/services/ingredientService";
import { fetchRecipe, getRecipeUsername } from "@/services/recipeServiceServer";
import { fetchUnits } from "@/services/unitService";
import React from "react";

const RecipesPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const recipe = await fetchRecipe(id);
  const favoriteRecipes = await fecthFavoriteRecipes();
  const units = await fetchUnits();
  const ingredients = await fetchIngredients();
  const username = await getRecipeUsername(recipe._id);

  return (
    <RecipeProvider
      fetchedIngredients={ingredients}
      fetchedUsername={username}
      fetchedUnits={units}
      fetchedRecipe={recipe}
    >
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
