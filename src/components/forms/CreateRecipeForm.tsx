"use client";

import { IoIosClose } from "react-icons/io";
import Button from "../ui/buttons/Button";
import ErrorMessage from "../ui/ErrorMessage";
import IngredientDropdown from "../ui/IngredientDropdown";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IngredientInterface } from "@/types/types";
import { addRecipe } from "@/services/recipeService";
import { validateCreateRecipeForm } from "@/utils/validation";
import { fetchUnits } from "@/services/unitService";
import { useQuery } from "@tanstack/react-query";

const CreateRecipeForm = () => {
  const router = useRouter();
  const [ingredientInputValue, setIngredientInputValue] = useState<string>("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<IngredientInterface[]>([]);

  const { data: units } = useQuery({
    queryKey: ["units"],
    queryFn: fetchUnits,
  });

  const handleRecipeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
    setError("");
  };

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredientInputValue(event.target.value);
    setError("");
  };

  const handleIngredientSelect = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setError("An ingredient can't be added twice");
      setIngredientInputValue("");
      setIsDropdownOpen(false);
    } else {
      setIngredientInputValue("");
      setSelectedIngredients((prev) => [...prev, ingredient]);
      setIngredients((prev) => [
        ...prev,
        {
          ingredient: ingredient,
          quantity: 0,
          unit: "g",
        },
      ]);
      setIsDropdownOpen(false);
    }
  };

  const deleteIngredient = (ingredientName: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((item) => item !== ingredientName)
    );
    setIngredients((prev) =>
      prev.filter((item) => item.ingredient !== ingredientName)
    );
  };

  const handleCreateRecipe = (event: FormEvent) => {
    event.preventDefault();

    const validationError = validateCreateRecipeForm(recipeName, ingredients);
    if (validationError) {
      setError(validationError);
      return;
    }

    const formattedIngredients = ingredients.map(
      (ing: IngredientInterface) => ({
        ingredient: ing.ingredient,
        quantity: Number(ing.quantity),
        unit: ing.unit,
      })
    );

    const newRecipe = {
      name: recipeName,
      ingredients: formattedIngredients,
      description,
    };

    try {
      addRecipe(newRecipe);
      router.push("/dashboard/recipes");
      setSelectedIngredients([]);
      setRecipeName("");
      setDescription("");
      setIngredients([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateIngredient = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ingredientName: string
  ) => {
    const { name, value } = event.target;

    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.ingredient === ingredientName
          ? { ...ingredient, [name]: value }
          : ingredient
      )
    );
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [selectedIngredients]);

  return (
    <form
      onSubmit={handleCreateRecipe}
      className="py-5 flex flex-col gap-5 w-full rounded text-black"
      noValidate
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">
          Recipe name <span className="text-red-600">*</span>
        </label>
        <input
          className="border py-2 px-4 rounded outline-none"
          name="name"
          id="name"
          type="text"
          value={recipeName}
          onChange={handleRecipeNameChange}
          required
        />
      </div>
      <div className="flex flex-col justify-between items-start gap-10 sm:flex-row">
        <div className="flex-1 flex flex-col gap-1 w-full">
          <label htmlFor="ingredients">
            Ingredients <span className="text-red-600">*</span>
          </label>
          <div className="relative w-full">
            <input
              name="ingredients"
              id="ingredients"
              className="w-full border py-2 px-4 rounded outline-none"
              type="text"
              value={ingredientInputValue}
              onChange={handleIngredientChange}
              required
            />
            <IngredientDropdown
              ingredientInputValue={ingredientInputValue}
              isDropdownOpen={isDropdownOpen}
              handleIngredientSelect={handleIngredientSelect}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </div>
          <div className="mt-2 border bg-white py-2 px-4 rounded outline-none min-h-80 flex flex-col gap-3">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient}
                className="relative flex gap-2 items-center"
              >
                <input
                  className="py-2 pl-3 outline-none w-14 border text-xs"
                  type="number"
                  name="quantity"
                  placeholder="0"
                  value={
                    ingredients.find((item) => item.ingredient === ingredient)
                      ?.quantity || ""
                  }
                  onChange={(event) =>
                    handleCreateIngredient(event, ingredient)
                  }
                  required
                />
                <select
                  className="text-xs outline-none"
                  name="unit"
                  role="unit-combobox"
                  value={
                    ingredients.find((item) => item.ingredient === ingredient)
                      ?.unit || ""
                  }
                  onChange={(event) =>
                    handleCreateIngredient(event, ingredient)
                  }
                  required
                >
                  {units.map((unit: string) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <p className="px-2">{ingredient}</p>
                <div className="absolute right-0 top-2 text-neutral-600">
                  <button
                    role="delete-ingredient"
                    onClick={() => deleteIngredient(ingredient)}
                  >
                    <IoIosClose />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1 w-full">
          <label htmlFor="name">Description</label>
          <textarea
            className="border py-2 px-4 rounded outline-none"
            name="description"
            rows={15}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="w-32 m-auto md:m-0">
        <Button filled color="white" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateRecipeForm;
