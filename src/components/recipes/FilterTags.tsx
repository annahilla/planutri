import { RecipeInterface } from "@/types/types";
import FilterTagItem from "./FilterTagItem";
import { useEffect, useState } from "react";
import { getFavoriteRecipes } from "@/services/favoriteRecipeService";

const FilterTags = ({
  recipes,
  setFilteredRecipes,
}: {
  recipes: RecipeInterface[];
  setFilteredRecipes: (recipes: RecipeInterface[]) => void;
}) => {
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const favoriteIds = await getFavoriteRecipes();
      setFavoriteRecipeIds(favoriteIds);
    };

    fetchFavoriteRecipes();
  }, [recipes]);

  const applyFilter = (filter: string) => {
    let updatedFilters = [...activeFilters];

    if (filter === "public" || filter === "owned") {
      updatedFilters = updatedFilters.filter(
        (currentFilter) =>
          currentFilter !== "public" && currentFilter !== "owned"
      );
      updatedFilters.push(filter);
    } else {
      if (updatedFilters.includes("favorites")) {
        updatedFilters = updatedFilters.filter(
          (currentFilter) => currentFilter !== "favorites"
        );
      }
      updatedFilters.push(filter);
    }

    setActiveFilters(updatedFilters);
    filterRecipes(updatedFilters);
  };

  const filterRecipes = (filters: string[]) => {
    let filteredRecipes = [...recipes];

    if (filters.includes("public")) {
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.isPublic);
    } else if (filters.includes("owned")) {
      filteredRecipes = filteredRecipes.filter((recipe) => !recipe.isPublic);
    }

    if (filters.includes("favorites")) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe._id && favoriteRecipeIds.includes(recipe._id)
      );
    }

    setFilteredRecipes(filteredRecipes);
  };

  const closeFilter = (activeFilter: string) => {
    const updatedFilters = activeFilters.filter(
      (filter) => filter !== activeFilter
    );
    setActiveFilters(updatedFilters);
    filterRecipes(updatedFilters);
  };

  return (
    <div className="flex gap-2 items-center max-w-full">
      <FilterTagItem
        handleFilter={() => applyFilter("public")}
        closeTag={() => closeFilter("public")}
        isActive={activeFilters.includes("public")}
      >
        Public
      </FilterTagItem>
      <FilterTagItem
        handleFilter={() => applyFilter("owned")}
        closeTag={() => closeFilter("owned")}
        isActive={activeFilters.includes("owned")}
      >
        Owned
      </FilterTagItem>
      <FilterTagItem
        handleFilter={() => applyFilter("favorites")}
        closeTag={() => closeFilter("favorites")}
        isActive={activeFilters.includes("favorites")}
      >
        Favorites
      </FilterTagItem>
    </div>
  );
};

export default FilterTags;
