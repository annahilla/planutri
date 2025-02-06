"use client";

import Button from "@/components/ui/Button";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IoIosClose } from "react-icons/io";
import { IngredientInterface } from "@/types/types";
import { addRecipe } from "@/services/recipeService";
import { useAppSelector } from "@/lib/store/reduxHooks";
import IngredientDropdown from "@/components/ui/IngredientDropdown";

const CreateRecipe = () => {
  const units = useAppSelector((state) => state.units.units);
  const [ingredientInputValue, setIngredientInputValue] = useState<string>("");

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<IngredientInterface[]>([]);

  const handleRecipeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipeName(event.target.value);
    setError("");
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    setError("");

    if (!recipeName.trim()) {
      setError("Please enter a recipe name");
      return;
    }

    if (ingredients.length === 0) {
      setError("Please enter at least one ingredient");
      return;
    }

    if (ingredients.length > 0) {
      for (const ing of ingredients) {
        if (ing.quantity <= 0 || isNaN(ing.quantity)) {
          setError(`Please enter a valid quantity for ${ing.ingredient}`);
          return;
        }
      }
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
    <div className="flex flex-col items-center w-full md:items-start xl:w-2/3">
      <h2 className="mb-6 text-2xl md:mb-10">Create a Recipe</h2>
      <form
        onSubmit={handleCreateRecipe}
        className="flex flex-col gap-5 w-full"
        noValidate
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">
            Recipe name <span className="text-red-600">*</span>
          </label>
          <input
            className="border py-2 px-4 rounded outline-none"
            name="name"
            type="text"
            value={recipeName}
            onChange={handleRecipeNameChange}
            required
          />
        </div>
        <div className="flex flex-col justify-between items-start gap-10 sm:flex-row">
          <div className="flex-1 flex flex-col gap-1 w-full">
            <label htmlFor="name">
              Ingredients <span className="text-red-600">*</span>
            </label>
            <div className="relative w-full">
              <input
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
            <div className="mt-2 border py-2 px-4 rounded outline-none min-h-80 flex flex-col gap-3">
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
                    value={
                      ingredients.find((item) => item.ingredient === ingredient)
                        ?.unit || ""
                    }
                    onChange={(event) =>
                      handleCreateIngredient(event, ingredient)
                    }
                    required
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <p className="px-2">{ingredient}</p>
                  <div className="absolute right-0 top-2 text-neutral-600">
                    <button onClick={() => deleteIngredient(ingredient)}>
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
          <Button filled type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
