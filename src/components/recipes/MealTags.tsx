"use client";

import { useEffect, useState } from "react";
import FilterTagItem from "./FilterTagItem";
import { Meal } from "@/types/types";

const MealTags = ({ setMeals }: { setMeals: (meal: Meal[]) => void }) => {
  const [activeFilters, setActiveFilters] = useState<Meal[]>([]);

  const handleMealClick = (meal: string) => {
    if (meal === "Breakfast") {
      setActiveFilters((prev) => [...prev, "Breakfast"]);
    } else if (meal === "Lunch") {
      setActiveFilters((prev) => [...prev, "Lunch"]);
    } else if (meal === "Snack") {
      setActiveFilters((prev) => [...prev, "Snack"]);
    } else if (meal === "Dinner") {
      setActiveFilters((prev) => [...prev, "Dinner"]);
    }
  };

  const closeFilter = (activeFilter: string) => {
    const updatedFilters = activeFilters.filter(
      (filter) => filter !== activeFilter
    );
    setActiveFilters(updatedFilters);
    setMeals(updatedFilters);
  };

  useEffect(() => {
    if (typeof setMeals === "function") {
      setMeals(activeFilters);
    }
  }, [activeFilters]);

  return (
    <div className="flex gap-2 items-center max-w-full">
      <FilterTagItem
        handleFilter={() => handleMealClick("Breakfast")}
        closeTag={() => closeFilter("Breakfast")}
        isActive={activeFilters.includes("Breakfast")}
      >
        Breakfast
      </FilterTagItem>
      <FilterTagItem
        handleFilter={() => handleMealClick("Lunch")}
        closeTag={() => closeFilter("Lunch")}
        isActive={activeFilters.includes("Lunch")}
      >
        Lunch
      </FilterTagItem>
      <FilterTagItem
        handleFilter={() => handleMealClick("Snack")}
        closeTag={() => closeFilter("Snack")}
        isActive={activeFilters.includes("Snack")}
      >
        Snack
      </FilterTagItem>
      <FilterTagItem
        handleFilter={() => handleMealClick("Dinner")}
        closeTag={() => closeFilter("Dinner")}
        isActive={activeFilters.includes("Dinner")}
      >
        Dinner
      </FilterTagItem>
    </div>
  );
};

export default MealTags;
