import RecipeDetails from "@/components/RecipeDetails";
import { Recipe } from "@/types/types";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

async function fetchRecipe(id: string) {
  const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
  const recipe = await response.json();
  return recipe;
}

const RecipeDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const recipe: Recipe = await fetchRecipe(id);

  return (
    <div className="flex flex-col mx-10 my-6 md:ml-[20rem] md:items-start md:w-full">
      <div className="flex gap-3 items-center mb-5">
        <Link href={"/dashboard/recipes"} className="text-neutral-400">
          <IoMdArrowBack size={24} />
        </Link>
        <h2 className="text-2xl">{recipe.name}</h2>
      </div>
      <RecipeDetails currentRecipe={recipe} />
    </div>
  );
};

export default RecipeDetailsPage;
