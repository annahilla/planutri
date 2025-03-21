"use client";

import { useFilteredRecipes } from "@/context/FilteredRecipesContext";
import { useRecipes } from "@/context/RecipesContext";
import { getRecipes } from "@/services/recipeService";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const SearchInput = () => {
  const { isModal, page } = useRecipes();
  const { setFilteredRecipes } = useFilteredRecipes();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const updateURL = (search: string, page = 1) => {
    if (isModal) {
      updateRecipes();
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", page.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  const updateRecipes = async () => {
    const { recipes } = await getRecipes(page, searchQuery);
    setFilteredRecipes(recipes);
  };

  const handleSearch = () => {
    updateURL(searchQuery, 1);
  };

  const handleClearSearch = async () => {
    setSearchQuery("");

    if (isModal) {
      const { recipes } = await getRecipes(page);
      setFilteredRecipes(recipes);
    }
    updateURL("", 1);
  };

  return (
    <div className="my-6 relative">
      <input
        className="border px-10 py-2 rounded-full w-full font-light outline-none"
        type="text"
        name="recipe"
        placeholder="Search recipe"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
        <CiSearch />
      </div>

      {searchQuery && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-black transition"
          onClick={handleClearSearch}
        >
          <IoClose size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
