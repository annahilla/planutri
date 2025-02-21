import { IngredientInterface } from "@/types/types";

const IngredientQuantityAndUnit = ({
  ingredient,
}: {
  ingredient: IngredientInterface;
}) => {
  return (
    <div className="flex gap-1 text-neutral-500">
      <span>{ingredient.quantity}</span>
      <span>{ingredient.unit}</span>
    </div>
  );
};

export default IngredientQuantityAndUnit;
