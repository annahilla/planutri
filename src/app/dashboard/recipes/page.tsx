import RecipesList from "@/components/recipes/recipes-list/RecipesList";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { CiSquarePlus } from "react-icons/ci";
import { fetchRecipes } from "@/services/recipeServiceServer";
import DashboardHeader from "@/components/ui/DashboardHeader";
import { fecthFavoriteRecipes } from "@/services/favoriteRecipesServiceServer";
import { RecipesProvider } from "@/context/RecipesContext";
import { FavoriteRecipesProvider } from "@/context/FavoriteRecipesContext";
import { FilteredRecipesProvider } from "@/context/FilteredRecipesContext";

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
        <RecipesProvider fetchedRecipes={recipes}>
          <FilteredRecipesProvider recipes={recipes}>
            <FavoriteRecipesProvider fetchedFavoriteRecipes={favoriteRecipes}>
              <RecipesList />
            </FavoriteRecipesProvider>
          </FilteredRecipesProvider>
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
