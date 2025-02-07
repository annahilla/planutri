import { getRecipes } from "@/services/recipeService";
import RecipesList from "@/components/RecipesList";

const RecipesPage = async () => {
  const recipes = await getRecipes();

  return (
    <div>
      <h2 className="text-2xl mb-5">Recipes</h2>
      <RecipesList recipes={recipes} showLinks={true} />
    </div>
  );
};

export default RecipesPage;
