"use client";

import Day from "./Day";
import { days, MenuInterface, RecipeInterface } from "@/types/types";

const Week = ({
  recipes,
  menu,
}: {
  recipes: RecipeInterface[];
  menu: MenuInterface[];
}) => {
  return (
    <div className="transition-all duration-300 min-h-[80vh] invisible-scrollbar flex overflow-x-auto scrollbar-none snap-x snap-mandatory w-full md:grid md:grid-cols-[repeat(auto-fit,minmax(185px,1fr))] md:overflow-x-hidden gap-3">
      {days.map((day) => (
        <div
          key={day}
          className="flex flex-col h-full justify-between min-w-full snap-start md:h-auto md:min-w-0"
        >
          <Day recipes={recipes} dayOfTheWeek={day} fullMenu={menu} />
        </div>
      ))}
    </div>
  );
};

export default Week;
