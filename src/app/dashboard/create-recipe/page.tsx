"use client";

import Button from "@/components/ui/Button";
import { useIngredients } from "@/hooks/useIngredients";
import React, { useState, useEffect } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IoIosClose } from "react-icons/io";
import { useUnits } from "@/hooks/useUnits";

const CreateRecipe = () => {
  const ingredients = useIngredients();
  const units = useUnits();
  const [ingredientInputValue, setIngredientInputValue] = useState<string>("");
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientInputValue(e.target.value);
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
      setIsDropdownOpen(false);
    }
  };

  const deleteIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((item) => item !== ingredient)
    );
  };

  useEffect(() => {
    if (ingredientInputValue === "") {
      setIsDropdownOpen(false);
      setFilteredIngredients([]);
    } else {
      setIsDropdownOpen(true);
      const filtered = ingredients.filter((ingredient) =>
        ingredient.toLowerCase().startsWith(ingredientInputValue.toLowerCase())
      );
      setFilteredIngredients(filtered);
    }
  }, [ingredientInputValue, ingredients]);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [selectedIngredients]);

  return (
    <div className="flex flex-col items-center mx-10 my-6 md:ml-[20rem] md:items-start md:w-2/3">
      <h2 className="mb-6 text-2xl md:mb-10">Create a Recipe</h2>
      <form className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Recipe name</label>
          <input
            className="border py-2 px-4 rounded outline-none"
            name="name"
            type="text"
          />
        </div>
        <div className="flex flex-col justify-between items-start gap-10 sm:flex-row">
          <div className="relative flex-1 flex flex-col gap-1 w-full">
            <label htmlFor="name">Ingredients</label>
            <input
              className="border py-2 px-4 rounded outline-none"
              type="text"
              value={ingredientInputValue}
              onChange={handleInputChange}
            />
            {isDropdownOpen && (
              <ul className="z-[1000] absolute top-20 w-full bg-white border border-t-0 rounded-b max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {filteredIngredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="py-2 px-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleIngredientSelect(ingredient)}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}
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
                  />
                  <select className="text-xs outline-none" name="unity" id="">
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
