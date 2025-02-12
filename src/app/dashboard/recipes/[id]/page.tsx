"use client";

import RecipeDetails from "@/components/RecipeDetails";
import { Recipe } from "@/types/types";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { getRecipe } from "@/services/recipeService";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { useParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

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
    return (
      <div className="flex items-center justify-center h-[90vh] w-full">
        <BeatLoader color="#545046" />
      </div>
    );
  }

  return (
    <div className="flex bg-white h-full py-5 flex-col px-6 rounded text-black md:items-start md:w-full">
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
