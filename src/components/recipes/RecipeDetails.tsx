"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import Button from "../ui/buttons/Button";
import { deleteRecipe, updateRecipe } from "@/services/recipeService";
import { IngredientInterface, RecipeInterface } from "@/types/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import IngredientDropdown from "../ui/IngredientDropdown";
import { IoIosClose } from "react-icons/io";
import ErrorMessage from "../ui/ErrorMessage";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";
import { validateCreateRecipeForm } from "@/utils/validation";
import { fetchRecipes } from "@/lib/store/apis/recipeSlice";
import AddButton from "../ui/buttons/AddButton";

const RecipeDetails = ({
  currentRecipe,
  isModal = false,
  closeModal,
  clearRecipe,
}: {
  currentRecipe: RecipeInterface;
  isModal?: boolean;
  closeModal?: () => void;
  clearRecipe?: (id: string) => void;
}) => {
  const dispatch = useAppDispatch();
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

    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient !== ""
    );
    const emptyIngredients = ingredients.filter(
      (ingredient) => ingredient.ingredient === ""
    );

    const validationError = validateCreateRecipeForm(recipeName, ingredients);
    if (validationError) {
      setError(validationError);
      return;
    }

    emptyIngredients.map((ingredient) => deleteIngredient(ingredient._id!));
    const ingredientsForDB = updatedIngredients.map((ingredient) => {
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
        dispatch(fetchRecipes());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }

    if (isModal) {
      closeModal?.();
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

    const updatedValue =
      name === "quantity" ? (isNaN(Number(value)) ? 0 : Number(value)) : value;

    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient._id === id
          ? { ...ingredient, [name]: updatedValue }
          : ingredient
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
    index: number
  ) => {
    setIngredients((prevIngredients) => {
      const updated = prevIngredients.map((ingredient, i) =>
        i === index
          ? { ...ingredient, ingredient: selectedIngredient }
          : ingredient
      );

      return updated;
    });

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
          clearRecipe?.(currentRecipe._id);
          closeModal?.();
        } else {
          router.push("/dashboard/recipes");
        }
        if (token) {
          await deleteRecipe(currentRecipe._id, token);
          dispatch(fetchRecipes());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full lg:px-5">
      <div className="flex flex-col justify-between my-5 w-full min-h-[75vh] md:w-full">
        <div className="flex md:flex-row md:gap-10 md:items-strech flex-col gap-5 min-h-[60vh]">
          <div className="flex-shrink">
            <div className="mb-7">
              <h5 className="text-xl mb-4">Recipe Name</h5>
              <input
                className="border py-2 px-4 rounded outline-none w-full"
                type="text"
                value={recipeName}
                name="name"
                onChange={changeRecipeName}
              />
            </div>
            <div className="w-full">
              <h5 className="text-xl my-4">Ingredients</h5>
              <ul className="flex flex-col gap-8 md:gap-3">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={ingredient._id || index}
                    className="relative flex flex-col gap-4 md:flex-row md:items-center"
                  >
                    <div className="flex gap-2">
                      <input
                        className="border py-2 px-4 rounded outline-none w-full md:w-16"
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
                    <div className="flex gap-2">
                      <div className="relative w-full md:flex-1">
                        <input
                          className="border py-2 px-4 rounded outline-none w-full md:w-32 xl:w-full"
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
                                  (ing) =>
                                    ing.ingredient === ingredient.ingredient
                                )?.ingredient || ""
                              }
                              isDropdownOpen={isDropdownOpen}
                              setIsDropdownOpen={setIsDropdownOpen}
                              handleIngredientSelect={(selectedIngredient) =>
                                handleIngredientSelect(
                                  selectedIngredient,
                                  index
                                )
                              }
                            />
                          )}
                      </div>
                      <button onClick={() => deleteIngredient(ingredient._id!)}>
                        <IoIosClose size={24} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <AddButton item="ingredient" handleClick={addIngredientInput} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <h5 className="text-xl mb-4">Description</h5>
            <textarea
              className="border py-2 px-4 rounded outline-none w-full flex-1 resize-none"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        {error && <ErrorMessage message={error} />}

        <div
          className={`flex gap-4 mt-7 items-center justify-center w-full md:justify-start`}
        >
          <Button handleClick={saveRecipe} filled type="button">
            Save
          </Button>
          {currentRecipe && currentRecipe._id && (
            <Button handleClick={openDeleteRecipe} color="black" type="button">
              Delete
            </Button>
          )}
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
