import RecipesList from "@/components/recipes/RecipesList";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { CiSquarePlus } from "react-icons/ci";
import { fetchRecipes } from "@/services/fetchrecipes";
import { cookies } from "next/headers";

const RecipesPage = async () => {
  const token = (await cookies()).get("token")?.value;
  const recipes = token ? await fetchRecipes(token) : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <PageTitle>Recipes</PageTitle>
        <Link href={"/dashboard/create-recipe"}>
          <DashboardButton icon={<CiSquarePlus size={17} />}>
            Create Recipe
          </DashboardButton>
        </Link>
      </div>
      {recipes.length > 0 ? (
        <RecipesList recipes={recipes} showLinks={true} />
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
