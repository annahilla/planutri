import { Recipe } from "@/types/types";

async function fetchRecipes() {
  const response = await fetch("http:/localhost:3000/api/recipes");
  const recipes = await response.json();
  return recipes;
}

const RecipesPage = async () => {
  const recipes = await fetchRecipes();
  console.log(recipes);
  return (
    <div className="flex flex-col items-center mx-10 my-6 md:ml-[20rem] md:items-start md:w-full">
      <h2 className="text-2xl mb-5">Recipes</h2>
      {recipes.map((recipe: Recipe) => (
        <div className="my-3 w-full border p-5 rounded" key={recipe._id}>
          <h3 className="text-xl text-bold">{recipe.name}</h3>
          <ul className="my-3">
            {recipe.ingredients.map((ingredient) => (
              <li className="flex gap-2" key={ingredient.ingredient}>
                <p className="text-neutral-500">
                  {ingredient.quantity} {ingredient.unit}
                </p>
                <p className="text-neutral-800">{ingredient.ingredient}</p>
              </li>
            ))}
          </ul>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipesPage;
