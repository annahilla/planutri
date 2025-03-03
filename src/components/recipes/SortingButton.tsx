"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { RecipeInterface } from "@/types/types";
import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SortingButton = ({
  recipes,
  setFilteredRecipes,
}: {
  recipes: RecipeInterface[];
  setFilteredRecipes: (recipes: RecipeInterface[]) => void;
}) => {
  const buttonRef = useRef<HTMLDivElement>(null!);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useClickOutside(buttonRef, closeDropdown);

  const sortByNewest = () => {
    const sortedByNewest = [...recipes].sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
    );
    setFilteredRecipes(sortedByNewest);
    closeDropdown();
  };

  const sortByOldest = () => {
    const sortedByOldest = [...recipes].sort(
      (a, b) =>
        new Date(a.createdAt ?? 0).getTime() -
        new Date(b.createdAt ?? 0).getTime()
    );
    setFilteredRecipes(sortedByOldest);
    closeDropdown();
  };

  const sortAlphabetically = () => {
    const sortedAlphabetically = [...recipes].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredRecipes(sortedAlphabetically);
    closeDropdown();
  };

  return (
    <div className="relative" ref={buttonRef}>
      <button
        onClick={toggleDropdown}
        className="outline-none flex items-center gap-2 bg-neutral-100 text-neutral-500 py-1 px-3 rounded-full text-sm hover:text-neutral-600"
      >
        Sort
        {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {isDropdownOpen && (
        <div className="flex flex-col items-center gap-3 p-3 absolute bg-neutral-50 text-neutral-500 z-[1000] right-0 top-8 text-sm rounded shadow-sm">
          <button onClick={sortByNewest} className="hover:text-neutral-600">
            Newest first
          </button>
          <button onClick={sortByOldest} className="hover:text-neutral-600">
            Oldest first
          </button>
          <button
            onClick={sortAlphabetically}
            className="hover:text-neutral-600"
          >
            Alphabetically
          </button>
        </div>
      )}
    </div>
  );
};

export default SortingButton;
