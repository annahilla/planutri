import RecipeDetailsPageClient from "@/components/recipes/RecipesPageClient";
import { fetchRecipe } from "@/services/recipeServiceServer";
import React from "react";

const RecipesPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(params);
  const recipe = await fetchRecipe(id);

  return <RecipeDetailsPageClient recipe={recipe} />;
};

export default RecipesPage;
