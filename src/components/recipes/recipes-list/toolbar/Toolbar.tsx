import OverflowContainer from "@/components/ui/OverflowContainer";
import SortingButton from "./SortingButton";
import { useRecipes } from "@/context/RecipesContext";
import { useEffect, useState } from "react";
import { getFavoriteRecipes } from "@/services/favoriteRecipeService";
import FilterTags from "./FilterTags";
import MealTags from "./MealTags";
import { useFilteredRecipes } from "@/context/FilteredRecipesContext";

const Toolbar = () => {
  const [mealFilters, setMealFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const { recipes } = useRecipes();
  const { filteredRecipes, setFilteredRecipes } = useFilteredRecipes();
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const favoriteIds = await getFavoriteRecipes();
      setFavoriteRecipeIds(favoriteIds);
    };

    fetchFavoriteRecipes();
  }, [recipes]);

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

  useEffect(() => {
    filterRecipes();
  }, [mealFilters, typeFilters, recipes, favoriteRecipeIds]);

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:gap-2">
      <OverflowContainer>
        <div className="flex gap-2">
          <FilterTags setTypeFilters={setTypeFilters} />
          <MealTags setMealFilters={setMealFilters} />
        </div>
      </OverflowContainer>
      <div className="flex items-center gap-4 w-full justify-end">
        <div className="text-neutral-500 text-sm">
          {filteredRecipes.length} results
        </div>
        <SortingButton recipes={recipes} />
      </div>
    </div>
  );
};

export default Toolbar;
