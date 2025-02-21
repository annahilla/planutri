"use client";

import { ChangeEvent, useState } from "react";
import IngredientDropdown from "../ui/IngredientDropdown";
import { IngredientInterface } from "@/types/types";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { IoIosClose } from "react-icons/io";
import AddButton from "../ui/buttons/AddButton";
import IngredientQuantityAndUnit from "../IngredientQuantityAndUnit";
import { BiSolidCheckboxChecked } from "react-icons/bi";

interface IngredientInputProps {
  ingredients: IngredientInterface[];
  editMode: boolean;
  setIngredients: (
    prev:
      | IngredientInterface[]
      | ((prev: IngredientInterface[]) => IngredientInterface[])
  ) => void;
  setError: (prev: string) => void;
}

const IngredientInput = ({
  ingredients,
  editMode,
  setIngredients,
  setError,
}: IngredientInputProps) => {
  const units = useAppSelector((state) => state.units.units);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIngredientDropdown, setActiveIngredientDropdown] = useState<
    string | null
  >(null);

  const handleCreateIngredient = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const { name, value } = event.target;
    setError("");

    const updatedValue =
      name === "quantity" ? (isNaN(Number(value)) ? 0 : Number(value)) : value;

    setIngredients((prevIngredients: IngredientInterface[]) =>
      prevIngredients.map((ingredient: IngredientInterface) =>
        ingredient._id === id
          ? { ...ingredient, [name]: updatedValue }
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

  return (
    <div className="w-full">
      <h5 className="text-xl mb-3">Ingredients</h5>
      <ul
        className={`flex flex-col gap-3 rounded ${
          editMode ? "bg-white" : "bg-beige p-5"
        }`}
      >
        {ingredients.map((ingredient, index) => (
          <li
            key={ingredient._id || index}
            className="relative w-full justify-between md:flex-row"
          >
            {editMode ? (
              <div className="flex gap-2">
                <input
                  className="border text-center py-2 px-4 rounded outline-none w-12 md:w-16 md:text-left"
                  name="quantity"
                  type="number"
                  value={ingredient.quantity}
                  onChange={(event) =>
                    handleCreateIngredient(event, ingredient._id!)
                  }
                />
                <select
                  className="border py-2 px-4 rounded outline-none bg-white border rounded"
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
                <div className="flex gap-2 flex-1 w-full">
                  <div className="relative w-full">
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
                              (ing: IngredientInterface) =>
                                ing.ingredient === ingredient.ingredient
                            )?.ingredient || ""
                          }
                          isDropdownOpen={isDropdownOpen}
                          setIsDropdownOpen={setIsDropdownOpen}
                          handleIngredientSelect={(selectedIngredient) =>
                            handleIngredientSelect(selectedIngredient, index)
                          }
                        />
                      )}
                  </div>
                  <button onClick={() => deleteIngredient(ingredient._id!)}>
                    <IoIosClose size={24} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="min-w-56 flex items-center gap-2">
                <BiSolidCheckboxChecked size={22} />
                <IngredientQuantityAndUnit ingredient={ingredient} />
                <p className="text-neutral-800">{ingredient.ingredient}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      {editMode && (
        <div className="mt-8">
          <AddButton item="ingredient" handleClick={addIngredientInput} />
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
