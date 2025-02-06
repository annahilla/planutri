import { Recipe } from "@/types/types";
import Link from "next/link";

async function fetchRecipes() {
  const response = await fetch("http:/localhost:3000/api/recipes");
  const recipes = await response.json();
  return recipes;
}

const RecipesPage = async () => {
  const recipes = await fetchRecipes();

  return (
    <div className="flex flex-col items-center md:items-start md:w-full">
      <h2 className="text-2xl mb-5">Recipes</h2>
      {recipes.map((recipe: Recipe) => (
        <Link
          href={`/dashboard/recipes/${recipe._id}`}
          className="flex-1 my-2 w-full border-l border-l-4 border-stone-100 p-5 cursor-pointer bg-[#fcfbfb] hover:bg-neutral-50"
          key={recipe._id}
        >
          <h3 className="text-xl text-bold">{recipe.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default RecipesPage;
