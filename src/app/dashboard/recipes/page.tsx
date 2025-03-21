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

export const revalidate = 60;

const RecipesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    search: string;
    meal: string;
    filter: string[];
    sort: string;
  }>;
}) => {
  const {
    page: pageParam,
    search: searchQuery,
    meal: mealFilter,
    filter: filter,
    sort: sort,
  } = await searchParams;
  const search = searchQuery || "";
  const page = parseInt(pageParam || "1", 10);

  const { recipes, totalPages } = await fetchRecipes(
    page,
    search,
    mealFilter,
    sort,
    filter
  );
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
      <RecipesProvider
        totalPages={totalPages}
        page={page}
        fetchedRecipes={recipes}
      >
        <FilteredRecipesProvider recipes={recipes}>
          <FavoriteRecipesProvider fetchedFavoriteRecipes={favoriteRecipes}>
            <RecipesList />
          </FavoriteRecipesProvider>
        </FilteredRecipesProvider>
      </RecipesProvider>
    </div>
  );
};

export default RecipesPage;
