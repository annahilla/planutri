"use client";

import { useEffect, useState } from "react";
import FilterTagItem from "./FilterTagItem";
import { Meal } from "@/types/types";

const MealTags = ({
  meals = [],
  setMeals,
  setMealFilters,
  isSnap = true,
}: {
  meals?: Meal[];
  setMeals?: (meal: Meal[]) => void;
  setMealFilters?: (filters: Meal[]) => void;
  isSnap?: boolean;
}) => {
  const [activeFilters, setActiveFilters] = useState<Meal[]>([]);

  const handleMealClick = (meal: Meal) => {
    setActiveFilters((prev) => (prev.includes(meal) ? prev : [...prev, meal]));
  };

  const closeFilter = (meal: Meal) => {
    const updatedFilters = activeFilters.filter((filter) => filter !== meal);
    setActiveFilters(updatedFilters);
    setMeals?.(updatedFilters);
  };

  useEffect(() => {
    setMealFilters?.(activeFilters);
    setMeals?.(activeFilters);
    console.log("Meals from tags", activeFilters);
  }, [activeFilters]);

  const getSelectedResults = (meal: Meal) => {
    setActiveFilters((prev) => (prev.includes(meal) ? prev : [...prev, meal]));
  };

  useEffect(() => {
    if (meals) {
      meals.map((meal) => getSelectedResults(meal));
    }
  }, []);

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
          closeTag={() => closeFilter(meal as Meal)}
          isActive={activeFilters.includes(meal as Meal)}
        >
          {meal}
        </FilterTagItem>
      ))}
    </div>
  );
};

export default MealTags;
