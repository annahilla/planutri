import useClickOutside from "@/hooks/useClickOutside";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { useEffect, useRef, useState } from "react";

interface IngredientDropdownProps {
  isDropdownOpen: boolean;
  ingredientInputValue: string;
  handleIngredientSelect: (ingredient: string) => void;
  setIsDropdownOpen: (value: boolean) => void;
}

const IngredientDropdown = ({
  isDropdownOpen,
  ingredientInputValue,
  handleIngredientSelect,
  setIsDropdownOpen,
}: IngredientDropdownProps) => {
  const dropdownRef = useRef<HTMLUListElement>(null!);
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const allIngredients = useAppSelector(
    (state) => state.ingredients.ingredients
  );

  useEffect(() => {
    if (ingredientInputValue === "") {
      setIsDropdownOpen(false);
      setFilteredIngredients([]);
    } else {
      setIsDropdownOpen(true);
      const filtered = allIngredients.filter((ingredient) =>
        ingredient.toLowerCase().startsWith(ingredientInputValue.toLowerCase())
      );
      setFilteredIngredients(filtered);
    }
  }, [ingredientInputValue, allIngredients]);

  return (
    <>
      {isDropdownOpen && (
        <ul
          data-testid="ingredient-list"
          ref={dropdownRef}
          className="z-[1000] absolute top-10 w-full bg-white border border-t-0 rounded-b max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        >
          {filteredIngredients.map((ingredient) => (
            <li
              role="listitem"
              key={ingredient}
              className="py-2 px-4 cursor-pointer hover:bg-gray-50"
              onClick={() => handleIngredientSelect(ingredient)}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default IngredientDropdown;
