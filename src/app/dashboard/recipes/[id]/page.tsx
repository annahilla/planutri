"use client";

import RecipeDetails from "@/components/RecipeDetails";
import { Recipe } from "@/types/types";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { getRecipe } from "@/services/recipeService";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { useParams } from "next/navigation";

const RecipeDetailsPage = () => {
  const params = useParams();
  const id = params?.id;
  const token = useAppSelector((state) => state.auth.user?.token);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (token && id !== undefined) {
      getRecipe(id?.toString(), token).then((data) => setRecipe(data));
    }
  }, []);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:items-start md:w-full">
      <div className="flex gap-3 items-center mb-5">
        <Link
          href={"/dashboard/recipes"}
          className="text-lightBrown hover:opacity-80"
        >
          <IoMdArrowBack size={24} />
        </Link>
        <h2 className="text-2xl">{recipe.name}</h2>
      </div>
      <RecipeDetails currentRecipe={recipe} />
    </div>
  );
};

export default RecipeDetailsPage;
