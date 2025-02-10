"use client";

import { useAppSelector } from "@/lib/store/reduxHooks";
import Button from "./ui/Button";
import { deleteRecipe, updateRecipe } from "@/services/recipeService";
import { IngredientInterface, Recipe } from "@/types/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import IngredientDropdown from "./ui/IngredientDropdown";
import { IoIosClose } from "react-icons/io";
import ErrorMessage from "./ui/ErrorMessage";
import DeleteConfirmationModal from "./ui/DeleteConfirmationModal";

const RecipeDetails = ({
  currentRecipe,
  isModal = false,
  closeModal,
  clearRecipe,
}: {
  currentRecipe: Recipe;
  isModal?: boolean;
  closeModal: () => void;
  clearRecipe: (id: string) => void;
}) => {
  const units = useAppSelector((state) => state.units.units);
  const router = useRouter();
  const [error, setError] = useState("");
  const [recipeName, setRecipeName] = useState(currentRecipe.name);
  const [description, setDescription] = useState(currentRecipe.description);
  const [ingredients, setIngredients] = useState(currentRecipe.ingredients);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIngredientDropdown, setActiveIngredientDropdown] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.user?.token);

  const saveRecipe = async () => {
    if (!currentRecipe) return;

    const emptyIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient === ""
    );

    if (!recipeName.trim()) {
      setError("Please enter a recipe name");
      return;
    }

    if (ingredients.length === 0) {
      setError("Please enter at least one ingredient");
      return;
    }

    if (ingredients.length > 0 && emptyIngredients.length === 0) {
      for (const ing of ingredients) {
        if (ing.quantity <= 0 || isNaN(ing.quantity)) {
          setError(`Please enter a valid quantity for ${ing.ingredient}`);
          return;
        }
      }
    }

    emptyIngredients.map((ingredient) => deleteIngredient(ingredient._id!));
    const ingredientsForDB = ingredients.map((ingredient) => {
      const { ...rest } = ingredient;
      return rest;
    });

    const updatedRecipe = {
      _id: currentRecipe._id,
      name: recipeName,
      ingredients: ingredientsForDB,
      description,
    };

    try {
      if (token) {
        await updateRecipe(updatedRecipe, token);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }

    if (isModal) {
      closeModal();
    } else {
      router.push("/dashboard/recipes");
    }
  };

  const changeRecipeName = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
    setError("");
  };

  const handleCreateIngredient = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const { name, value } = event.target;
    setError("");

    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient._id === id ? { ...ingredient, [name]: value } : ingredient
      )
    );
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

  const addIngredientInput = () => {
    const newEmptyIngredient: IngredientInterface = {
      _id: crypto.randomUUID(),
      ingredient: "",
      quantity: 0,
      unit: "g",
    };
    setIngredients((prevIngredients) => {
      return [...prevIngredients, newEmptyIngredient];
    });
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

  const openDeleteRecipe = () => {
    setIsModalOpen(true);
  };

  const handleDeleteRecipe = async () => {
    if (currentRecipe && currentRecipe._id) {
      try {
        if (isModal) {
          clearRecipe(currentRecipe._id);
          closeModal();
        } else {
          router.push("/dashboard/recipes");
        }
        if (token) {
          await deleteRecipe(currentRecipe._id, token);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="my-5 w-full">
        <div className="flex flex-col gap-5">
          <div>
            <h5 className="text-xl my-4">Recipe Name</h5>
            <input
              className="border py-2 px-4 rounded outline-none w-full"
              type="text"
              value={recipeName}
              name="name"
              onChange={changeRecipeName}
            />
          </div>
          <div>
            <h5 className="text-xl my-4">Ingredients</h5>
            <ul className="flex flex-col gap-8 md:gap-3">
              {ingredients.map((ingredient) => (
                <li
                  key={ingredient._id}
                  className="relative flex flex-col gap-4 md:flex-row md:items-center"
                >
                  <div className="flex gap-2">
                    <input
                      className="border py-2 px-4 rounded outline-none w-full md:w-24"
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
                  <div className="relative w-full md:flex-1">
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
                  <button onClick={() => deleteIngredient(ingredient._id!)}>
                    <IoIosClose size={24} />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={addIngredientInput}
              className="mt-8 bg-neutral-50 text-neutral-500 text-sm p-2 rounded hover:opacity-80"
            >
              + Add ingredient
            </button>
          </div>
          <div>
            <h5 className="text-xl my-4">Description</h5>
            <textarea
              className="border py-2 px-4 rounded outline-none w-full"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="flex gap-4 items-center w-1/2">
            <Button handleClick={saveRecipe} filled type="button">
              Save
            </Button>
            {currentRecipe && currentRecipe._id && (
              <Button
                handleClick={openDeleteRecipe}
                color="black"
                type="button"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DeleteConfirmationModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDeleteRecipe}
          thingToDelete="this recipe"
        />
      )}
    </div>
  );
};

export default RecipeDetails;
