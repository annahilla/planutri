"use client";

import { useAppSelector } from "@/lib/store/reduxHooks";
import Button from "./ui/Button";
import { deleteRecipe, updateRecipe } from "@/services/recipeService";
import { Recipe } from "@/types/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import IngredientDropdown from "./ui/IngredientDropdown";

const RecipeDetails = ({ currentRecipe }: { currentRecipe: Recipe }) => {
  const units = useAppSelector((state) => state.units.units);
  const router = useRouter();
  const [recipeName, setRecipeName] = useState(currentRecipe.name);
  const [description, setDescription] = useState(currentRecipe.description);
  const [ingredients, setIngredients] = useState(currentRecipe.ingredients);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIngredientDropdown, setActiveIngredientDropdown] = useState<
    string | null
  >(null);

  const handleCreateIngredient = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const { name, value } = event.target;

    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient._id === id ? { ...ingredient, [name]: value } : ingredient
      )
    );
  };

  const saveRecipe = async () => {
    if (!currentRecipe) return;

    const updatedRecipe = {
      _id: currentRecipe._id,
      name: recipeName,
      ingredients,
      description,
    };

    try {
      await updateRecipe(updatedRecipe);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }

    router.push("/dashboard/recipes");
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setIsDropdownOpen(true);
    setActiveIngredientDropdown(id);
    const currentIngredientName = event.target.value;

    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient._id === id
          ? { ...ingredient, ingredient: currentIngredientName }
          : ingredient
      )
    );
  };

  const handleIngredientSelect = (
    selectedIngredient: string,
    oldIngredient: string
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.ingredient === oldIngredient
          ? { ...ingredient, ingredient: selectedIngredient }
          : ingredient
      )
    );

    setIsDropdownOpen(false);
  };

  const handleDeleteRecipe = async () => {
    if (currentRecipe && currentRecipe._id) {
      try {
        await deleteRecipe(currentRecipe._id);
        router.push("/dashboard/recipes");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div className="my-5">
      <div className="flex flex-col gap-5">
        <div>
          <h5 className="text-xl my-4">Recipe Name</h5>
          <input
            className="border py-2 px-4 rounded outline-none w-full"
            type="text"
            value={recipeName}
            name="name"
            onChange={(event) => setRecipeName(event.target.value)}
          />
        </div>
        <div>
          <h5 className="text-xl my-4">Ingredients</h5>
          <ul className="flex flex-col gap-8  md:gap-3">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient._id}
                className="relative flex flex-col gap-4 md:flex-row"
              >
                <div className="flex gap-2">
                  <input
                    className="border py-2 px-4 rounded w-full outline-none md:w-24"
                    name="quantity"
                    type="number"
                    value={ingredient.quantity}
                    onChange={(event) =>
                      handleCreateIngredient(event, ingredient._id!)
                    }
                  />
                  <select
                    className="border py-2 px-4 rounded outline-none"
                    name="unit"
                    value={ingredient.unit}
                    onChange={(event) =>
                      handleCreateIngredient(event, ingredient._id!)
                    }
                  >
                    {units.map((unit: string) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <input
                    className="border py-2 px-4 rounded outline-none w-full"
                    type="text"
                    value={ingredient.ingredient}
                    onChange={(event) =>
                      handleIngredientChange(event, ingredient._id!)
                    }
                  />
                  {activeIngredientDropdown === ingredient._id &&
                    isDropdownOpen && (
                      <IngredientDropdown
                        ingredientInputValue={
                          ingredients.find(
                            (ing) => ing.ingredient === ingredient.ingredient
                          )?.ingredient || ""
                        }
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        handleIngredientSelect={(selectedIngredient) =>
                          handleIngredientSelect(
                            selectedIngredient,
                            ingredient.ingredient
                          )
                        }
                      />
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-xl my-4">Description</h5>
          <textarea
            className="border py-2 px-4 rounded outline-none w-full"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Button handleClick={saveRecipe} filled>
            Save
          </Button>
          {currentRecipe && currentRecipe._id && (
            <Button handleClick={handleDeleteRecipe} color="black">
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
