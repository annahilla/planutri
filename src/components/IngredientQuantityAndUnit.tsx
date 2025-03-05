import { IngredientInterface, RecipeInterface } from "@/types/types";

const IngredientQuantityAndUnit = ({
  ingredient,
  menuServings,
  recipe,
}: {
  ingredient: IngredientInterface;
  menuServings?: number;
  recipe: RecipeInterface;
}) => {
  const quantity =
    menuServings && recipe.servings
      ? (ingredient.quantity / recipe.servings) * menuServings
      : ingredient.quantity;

  return (
    <div className="flex gap-1 text-neutral-500">
      <span>{quantity}</span>
      <span>{ingredient.unit}</span>
    </div>
  );
};

export default IngredientQuantityAndUnit;
