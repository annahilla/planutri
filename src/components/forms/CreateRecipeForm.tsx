"use client";

import { IoIosClose } from "react-icons/io";
import Button from "../ui/buttons/Button";
import ErrorMessage from "../ui/ErrorMessage";
import IngredientDropdown from "../ui/IngredientDropdown";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IngredientInterface, Meal } from "@/types/types";
import { addRecipe, getIngredients, getUnits } from "@/services/recipeService";
import { validateCreateRecipeForm } from "@/utils/validation";
import { useQuery } from "@tanstack/react-query";
import TextAreaResizable from "./TextAreaResizable";
import MealTags from "../recipes/recipes-list/toolbar/MealTags";
import { ToggleSwitch } from "../ui/ToggleSwitch";

const CreateRecipeForm = () => {
  const router = useRouter();
  const [ingredientInputValue, setIngredientInputValue] = useState<string>("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<IngredientInterface[]>([]);
  const [servings, setServings] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const { data: units } = useQuery({
    queryKey: ["units"],
    queryFn: getUnits,
  });

  const { data: allIngredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
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

  const handleCreateRecipe = async (event: FormEvent) => {
    event.preventDefault();
    const formattedServings = Number(servings);

    const validationError = validateCreateRecipeForm(
      recipeName,
      ingredients,
      formattedServings,
      meals
    );

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
      servings: formattedServings,
      meals,
      isPublic,
    };

    try {
      await addRecipe(newRecipe);
      router.push("/dashboard/recipes");
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
      <div className="flex flex-col gap-1 flex-1">
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
      <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-center lg:gap-20">
        <div className="flex flex-col gap-1">
          <label htmlFor="servings">
            Servings <span className="text-red-600">*</span>
          </label>
          <input
            className="border py-2 px-4 rounded outline-none w-full md:w-24"
            name="servings"
            id="servings"
            type="number"
            value={servings}
            onChange={(event) => setServings(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1 invisible-scrollbar">
          <label className="mb-1">
            Meals <span className="text-red-600">*</span>
          </label>
          <MealTags isSnap={false} setMeals={setMeals} />
        </div>
      </div>

      <div className="flex mt-2 gap-1">
        <ToggleSwitch isOn={isPublic} setIsOn={setIsPublic} />
        <span className="ms-3 text-md font-medium text-gray-900 dark:text-gray-300">
          Public recipe
          <span className="text-xs mx-3 text-neutral-500">
            - If you mark a recipe as public, other users will see your recipe
          </span>
        </span>
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
              allIngredients={allIngredients}
            />
          </div>
          <div className="mt-2 border bg-white py-4 px-4 rounded outline-none min-h-60 flex flex-col gap-3">
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
                <p data-testid={ingredient} className="px-2">
                  {ingredient}
                </p>
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
          <TextAreaResizable value={description} setValue={setDescription} />
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="w-full md:w-32">
        <Button filled color="white" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateRecipeForm;
