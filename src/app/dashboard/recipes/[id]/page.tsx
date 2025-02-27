import RecipeDetailsPageClient from "@/components/recipes/RecipePageClient";
import { fetchRecipe } from "@/services/recipeServiceServer";
import React from "react";

const RecipesPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const recipe = await fetchRecipe(id);

  return <RecipeDetailsPageClient recipe={recipe} />;
};

export default RecipesPage;
