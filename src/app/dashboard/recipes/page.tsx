"use client";

import RecipesList from "@/components/recipes/RecipesList";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { BeatLoader } from "react-spinners";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import DashboardButton from "@/components/ui/buttons/DashboardButton";

const RecipesPage = () => {
  const recipes = useAppSelector((state) => state.recipes.recipes);
  const isLoading =
    useAppSelector((state) => state.recipes.status) === "loading";

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle>Recipes</PageTitle>
        <Link href={"/dashboard/create-recipe"}>
          <DashboardButton icon={<IoCreateOutline size={22} />}>
            Create Recipe
          </DashboardButton>
        </Link>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[80vh] w-full">
          <BeatLoader color="#545046" />
        </div>
      ) : (
        <RecipesList recipes={recipes} showLinks={true} />
      )}
    </div>
  );
};

export default RecipesPage;
