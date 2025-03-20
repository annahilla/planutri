"use client";

import { useFilteredRecipes } from "@/context/FilteredRecipesContext";
import { useRecipes } from "@/context/RecipesContext";
import { ChangeEvent, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  const { recipes } = useRecipes();
  const { setFilteredRecipes } = useFilteredRecipes();

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setFilteredRecipes(
      query === ""
        ? recipes
        : recipes.filter((recipe) => recipe.name.toLowerCase().includes(query))
    );
  };

  return (
    <div className="my-6 relative">
      <input
        className="border px-10 py-2 rounded-full w-full font-light outline-none"
        type="text"
        name="recipe"
        placeholder="Search recipe"
        onChange={search}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
        <CiSearch />
      </div>
    </div>
  );
};

export default SearchInput;
