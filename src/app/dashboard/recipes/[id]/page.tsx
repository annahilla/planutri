import RecipeDetails from "@/components/recipes/RecipeDetails";
import RecipeHeader from "@/components/recipes/RecipeHeader";
import { RecipeProvider } from "@/context/RecipeContext";
import { fetchRecipe } from "@/services/recipeServiceServer";
import React from "react";

const RecipesPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const recipe = await fetchRecipe(id);

  return (
    <RecipeProvider fetchedRecipe={recipe}>
      <div className="flex bg-white h-full pb-5 flex-col rounded text-black md:items-start md:w-full">
        <RecipeHeader />
        <RecipeDetails recipe={recipe} />
      </div>
    </RecipeProvider>
  );
};

export default RecipesPage;
