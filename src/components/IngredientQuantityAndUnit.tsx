import { IngredientInterface } from "@/types/types";

const IngredientQuantityAndUnit = ({
  ingredient,
  menuServings,
}: {
  ingredient: IngredientInterface;
  menuServings?: number;
}) => {
  const quantity = menuServings
    ? ingredient.quantity * menuServings
    : ingredient.quantity;

  return (
    <div className="flex gap-1 text-neutral-500">
      <span>{quantity}</span>
      <span>{ingredient.unit}</span>
    </div>
  );
};

export default IngredientQuantityAndUnit;
