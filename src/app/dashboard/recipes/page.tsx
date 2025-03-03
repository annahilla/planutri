import RecipesList from "@/components/recipes/RecipesList";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { CiSquarePlus } from "react-icons/ci";
import { fetchRecipes } from "@/services/recipeServiceServer";
import DashboardHeader from "@/components/ui/DashboardHeader";
import { fecthFavoriteRecipes } from "@/services/favoriteRecipesServiceServer";
import { RecipesProvider } from "@/context/RecipesContext";

const RecipesPage = async () => {
  const recipes = await fetchRecipes();
  const favoriteRecipes = await fecthFavoriteRecipes();

  return (
    <div>
      <DashboardHeader>
        <PageTitle>Recipes</PageTitle>
        <Link href={"/dashboard/create-recipe"}>
          <DashboardButton icon={<CiSquarePlus size={17} />}>
            Create Recipe
          </DashboardButton>
        </Link>
      </DashboardHeader>
      {recipes.length > 0 ? (
        <RecipesProvider
          fetchedRecipes={recipes}
          fetchedFavoriteRecipes={favoriteRecipes}
        >
          <RecipesList />
        </RecipesProvider>
      ) : (
        <div className="my-4 text-neutral-600">
          You haven&apos;t created any recipe yet.{" "}
          <Link className="underline" href={"/dashboard/create-recipe"}>
            Create a recipe
          </Link>{" "}
          to start.
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
