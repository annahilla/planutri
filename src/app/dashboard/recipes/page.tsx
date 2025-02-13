"use client";

import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipeService";
import RecipesList from "@/components/RecipesList";
import { Recipe } from "@/types/types";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { BeatLoader } from "react-spinners";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import DashboardButton from "@/components/ui/DashboardButton";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAppSelector((state) => state.auth.user?.token);

  useEffect(() => {
    if (token) {
      getRecipes(token)
        .then((data) => setRecipes(data))
        .finally(() => setIsLoading(false));
    }
  }, []);

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
