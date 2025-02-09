"use client";

import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipeService";
import RecipesList from "@/components/RecipesList";
import { Recipe } from "@/types/types";
import { useAppSelector } from "@/lib/store/reduxHooks";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const token = useAppSelector((state) => state.auth.user?.token);

  useEffect(() => {
    if (token) {
      getRecipes(token).then((data) => setRecipes(data));
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-5">Recipes</h2>
      <RecipesList recipes={recipes} showLinks={true} />
    </div>
  );
};

export default RecipesPage;
