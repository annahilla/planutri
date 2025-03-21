"use client";

import { useEffect } from "react";
import FilterTagItem from "./FilterTagItem";
import { Meal } from "@/types/types";
import { useSearchParams } from "next/navigation";

const MealTags = ({
  meals = [],
  isSnap = true,
}: {
  meals?: Meal[];
  isSnap?: boolean;
}) => {
  const searchParams = useSearchParams();
  const mealFilters: Meal[] =
    (searchParams.get("meal")?.split(",") as Meal[]) || [];

  const handleMealClick = (meal: Meal) => {
    const updatedFilters = mealFilters.includes(meal)
      ? mealFilters.filter((filter) => filter !== meal)
      : [...mealFilters, meal];

    updateURLParams(updatedFilters);
  };

  const updateURLParams = (updatedFilters: Meal[]) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (updatedFilters.length) {
      urlParams.set("meal", updatedFilters.join(","));
    } else {
      urlParams.delete("meal");
    }
    window.history.replaceState(null, "", "?" + urlParams.toString());
  };

  const getSelectedResults = (meal: Meal) => {
    return mealFilters.includes(meal);
  };

  useEffect(() => {
    if (meals) {
      meals.forEach((meal) => getSelectedResults(meal));
    }
  }, [meals]);

  return (
    <div
      className={`${
        isSnap
          ? "overflow-x-auto snap-x snap-mandatory scrollbar-invisible"
          : "flex-wrap"
      } flex gap-2 items-center`}
    >
      {["Breakfast", "Lunch", "Snack", "Dinner"].map((meal) => (
        <FilterTagItem
          key={meal}
          handleFilter={() => handleMealClick(meal as Meal)}
          closeTag={() => handleMealClick(meal as Meal)}
          isActive={getSelectedResults(meal as Meal)}
        >
          {meal}
        </FilterTagItem>
      ))}
    </div>
  );
};

export default MealTags;
