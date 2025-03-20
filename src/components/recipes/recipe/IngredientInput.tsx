"use client";

import { ChangeEvent, useState } from "react";
import IngredientDropdown from "@/components/ui/IngredientDropdown";
import { IngredientInterface, RecipeInterface } from "@/types/types";
import { IoIosClose } from "react-icons/io";
import IngredientQuantityAndUnit from "@/components/IngredientQuantityAndUnit";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { useRecipe } from "@/context/RecipeContext";

interface IngredientInputProps {
  ingredient: IngredientInterface;
  ingredients: IngredientInterface[];
  index: number;
  setIngredients: (
    prev:
      | IngredientInterface[]
      | ((prev: IngredientInterface[]) => IngredientInterface[])
  ) => void;
  setError: (prev: string) => void;
  menuServings?: number;
  recipe: RecipeInterface;
}

const IngredientInput = ({
  ingredient,
  ingredients,
  index,
  setIngredients,
  setError,
  menuServings,
  recipe,
}: IngredientInputProps) => {
  const { units, ingredientsList } = useRecipe();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIngredientDropdown, setActiveIngredientDropdown] = useState<
    string | null
  >(null);
  const [ingredientInputValue, setIngredientInputValue] = useState<string>(
    ingredient.ingredient
  );

  const handleCreateIngredient = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setError("");

    const updatedValue =
      name === "quantity" ? (isNaN(Number(value)) ? 0 : Number(value)) : value;

    setIngredients((prevIngredients: IngredientInterface[]) =>
      prevIngredients.map((ing: IngredientInterface) =>
        ing.ingredient === ingredient.ingredient
          ? { ...ing, [name]: updatedValue }
          : ing
      )
    );
  };

  const handleIngredientSelect = (
    selectedIngredient: string,
    index: number
  ) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = prevIngredients.map((ing, i) =>
        i === index ? { ...ing, ingredient: selectedIngredient } : ing
      );
      return updatedIngredients;
    });

    setIngredientInputValue(selectedIngredient);
    setIsDropdownOpen(false);
  };

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredientInputValue(event.target.value);
    setIsDropdownOpen(true);
    setActiveIngredientDropdown(ingredient._id!);
  };

  const deleteIngredient = (id: string) => {
    if (ingredients.length <= 1) {
      setError("You can't delete all ingredients");
      return;
    }
    setError("");
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient._id !== id)
    );
  };

  return (
    <li className="relative w-full justify-between md:flex-row">
      {isEditMode ? (
        <div className="flex gap-2">
          <input
            className="border text-center py-2 px-4 rounded outline-none w-12 md:w-24 md:text-left"
            step={0.25}
            name="quantity"
            type="number"
            value={ingredient.quantity}
            onChange={handleCreateIngredient}
          />
          <select
            className="border py-2 px-4 rounded outline-none bg-white border rounded"
            name="unit"
            value={ingredient.unit}
            onChange={handleCreateIngredient}
          >
            {units.map((unit: string) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <div className="flex gap-2 flex-1 w-full">
            <div className="relative w-full">
              <input
                name="ingredient"
                className="border py-2 px-4 rounded outline-none w-full"
                type="text"
                value={ingredientInputValue}
                onChange={handleIngredientChange}
              />
              {activeIngredientDropdown === ingredient._id &&
                isDropdownOpen && (
                  <IngredientDropdown
                    ingredientInputValue={ingredientInputValue}
                    isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                    handleIngredientSelect={(selectedIngredient) =>
                      handleIngredientSelect(selectedIngredient, index)
                    }
                    allIngredients={ingredientsList}
                  />
                )}
            </div>
            <button onClick={() => deleteIngredient(ingredient._id!)}>
              <IoIosClose size={24} />
            </button>
          </div>
        </div>
      ) : (
        <div className="min-w-56 flex items-start gap-2">
          <BiSolidCheckboxChecked size={22} />
          <IngredientQuantityAndUnit
            recipe={recipe}
            menuServings={menuServings}
            ingredient={ingredient}
          />
          <p className="text-neutral-800">{ingredient.ingredient}</p>
        </div>
      )}
    </li>
  );
};

export default IngredientInput;
