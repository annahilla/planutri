"use client";

import { RecipeInterface } from "@/types/types";
import RecipeCard from "./RecipeCard";
import SearchInput from "../ui/SearchInput";
import useSearchRecipe from "@/hooks/useSearchRecipe";
import { useEffect, useRef, useState } from "react";
import FilterTags from "./FilterTags";
import { useRecipes } from "@/context/RecipesContext";
import SortingButton from "./SortingButton";
import MealTags from "./MealTags";
import { getFavoriteRecipes } from "@/services/favoriteRecipeService";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface RecipeListProps {
  onSelect?: (recipe: RecipeInterface, servings: number) => void;
  isMenu?: boolean;
}

const RecipesList = ({ onSelect, isMenu = false }: RecipeListProps) => {
  const { recipes } = useRecipes();
  const { filteredRecipes, setFilteredRecipes, searchRecipe } =
    useSearchRecipe(recipes);
  const [menuServings, setMenuServings] = useState<{ [key: string]: number }[]>(
    []
  );
  const [mealFilters, setMealFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([]);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const favoriteIds = await getFavoriteRecipes();
      setFavoriteRecipeIds(favoriteIds);
    };

    fetchFavoriteRecipes();
  }, [recipes]);

  const filterRecipes = () => {
    let filtered = [...recipes];

    if (typeFilters.includes("public")) {
      filtered = filtered.filter((recipe) => recipe.isPublic);
    } else if (typeFilters.includes("owned")) {
      filtered = filtered.filter((recipe) => !recipe.isPublic);
    }

    if (typeFilters.includes("favorites")) {
      filtered = filtered.filter(
        (recipe) => recipe._id && favoriteRecipeIds.includes(recipe._id)
      );
    }

    if (mealFilters.length > 0) {
      filtered = filtered.filter((recipe) =>
        recipe.meals?.some((meal) => mealFilters.includes(meal))
      );
    }

    setFilteredRecipes(filtered);
  };

  const checkOverflow = () => {
    const container = filterContainerRef.current;
    if (container) {
      setIsOverflowing(container.scrollWidth > container.clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    const handleScroll = () => {
      const container = filterContainerRef.current;
      if (container) {
        setScrollEnd(
          container.scrollLeft >=
            container.scrollWidth - container.clientWidth - 1
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    filterContainerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      filterContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const favoriteIds = await getFavoriteRecipes();
      setFavoriteRecipeIds(favoriteIds);
    };

    fetchFavoriteRecipes();
  }, [recipes]);

  useEffect(() => {
    filterRecipes();
  }, [mealFilters, typeFilters, recipes, favoriteRecipeIds]);

  return (
    <div>
      <SearchInput search={searchRecipe} />
      <div className="flex flex-col gap-5 xl:flex-row xl:gap-2">
        <div className="flex justify-between items-center gap-2">
          <div
            ref={filterContainerRef}
            className="flex gap-2 flex-wrap overflow-x-auto snap-x snap-mandatory invisible-scrollbar"
          >
            <div className="flex snap-start gap-2 xl:justify-between xl:w-full">
              <div className="flex gap-2">
                <FilterTags setTypeFilters={setTypeFilters} />
                <MealTags setMealFilters={setMealFilters} />
              </div>
            </div>
          </div>
          {isOverflowing && (
            <div className="text-neutral-400">
              {scrollEnd ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 w-full justify-end">
          <div className="text-neutral-500 text-sm">
            {filteredRecipes.length} results
          </div>
          <SortingButton
            recipes={recipes}
            setFilteredRecipes={setFilteredRecipes}
          />
        </div>
      </div>
      <div
        className={`grid grid-cols-1 gap-3 mt-4 items-center md:items-start md:w-full md:grid-cols-2 lg:gap-4  ${
          isMenu
            ? "lg:grid-cols-2 xl:grid-cols-3"
            : "lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {filteredRecipes.map((recipe) => {
          const recipeServings =
            menuServings.find((item) => item[recipe.name] !== undefined)?.[
              recipe.name
            ] || 1;
          return (
            <div
              className="w-full h-full"
              key={recipe._id}
              onClick={() => {
                if (recipe._id) {
                  onSelect?.(recipe, recipeServings);
                }
              }}
            >
              <div className="h-full">
                <RecipeCard
                  recipe={recipe}
                  recipes={recipes}
                  setMenuServings={setMenuServings}
                  isMenu={isMenu}
                  setRecipes={setFilteredRecipes}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipesList;
