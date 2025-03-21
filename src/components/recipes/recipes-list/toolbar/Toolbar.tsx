import OverflowContainer from "@/components/ui/OverflowContainer";
import SortingButton from "./SortingButton";
import { useRecipes } from "@/context/RecipesContext";
import { useEffect } from "react";
import FilterTags from "./FilterTags";
import MealTags from "./MealTags";
import { useRouter, useSearchParams } from "next/navigation";

const Toolbar = () => {
  const searchParams = useSearchParams();
  const mealFilters = searchParams.get("meal")?.split(",") || [];
  const filterTags = searchParams.get("filter")?.split(",") || [];

  const router = useRouter();
  const { recipes } = useRecipes();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    if (mealFilters.length) urlParams.append("meal", mealFilters.join(","));
    if (filterTags.length) urlParams.set("filter", filterTags.join(","));

    router.push(`?${urlParams.toString()}`);
  }, [mealFilters, filterTags]);

  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:gap-2">
      <OverflowContainer>
        <div className="flex gap-2">
          <FilterTags />
          <MealTags />
        </div>
      </OverflowContainer>
      <div className="flex items-center gap-4 w-full justify-end">
        <div className="text-neutral-500 text-sm">{recipes.length} results</div>
        <SortingButton />
      </div>
    </div>
  );
};

export default Toolbar;
