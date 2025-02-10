"use client";

import { DayOfTheWeek, MenuInterface, Recipe } from "@/types/types";
import Day from "./Day";
import { useEffect, useState } from "react";
import { getRecipes } from "@/services/recipeService";
import { useAppSelector } from "@/lib/store/reduxHooks";
import { getMenu } from "@/services/menuService";

interface WeekProps {
  menu: MenuInterface[];
  setMenu: React.Dispatch<React.SetStateAction<MenuInterface[]>>;
}

const Week = ({ menu, setMenu }: WeekProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const token = useAppSelector((state) => state.auth.user?.token);
  const days: DayOfTheWeek[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      if (token && recipes.length === 0) {
        const data = await getRecipes(token);
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, [token, recipes.length]);

  useEffect(() => {
    const fetchMenu = async () => {
      if (token) {
        const data = await getMenu(token);
        setMenu(data);
      }
    };
    fetchMenu();
  }, [token, menu.length]);

  return (
    <div className="h-[80vh] invisible-scrollbar flex overflow-x-auto scrollbar-none snap-x snap-mandatory w-full md:grid md:grid-cols-2 ld:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 md:overflow-x-hidden gap-3">
      {days.map((day) => (
        <div
          key={day}
          className="flex flex-col h-full justify-between min-w-full snap-start md:h-auto md:min-w-0"
        >
          <Day
            dayOfTheWeek={day}
            recipes={recipes}
            menu={menu.filter((menu) => menu.dayOfTheWeek === day)}
          />
        </div>
      ))}
    </div>
  );
};

export default Week;
