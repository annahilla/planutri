import { useEffect, useState } from "react";
import FilterTagItem from "./FilterTagItem";

const FilterTags = ({
  setTypeFilters,
}: {
  setTypeFilters: (filters: string[]) => void;
}) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prevFilters) => {
      let updatedFilters = [...prevFilters];

      if (filter === "public") {
        updatedFilters = updatedFilters.filter((f) => f !== "owned");
      } else if (filter === "owned") {
        updatedFilters = updatedFilters.filter((f) => f !== "public");
      }

      if (updatedFilters.includes(filter)) {
        updatedFilters = updatedFilters.filter((f) => f !== filter);
      } else {
        updatedFilters.push(filter);
      }

      return updatedFilters;
    });
  };

  const closeFilter = (filter: string) => {
    const updatedFilters = activeFilters.filter((filt) => filt !== filter);
    setActiveFilters(updatedFilters);
  };

  useEffect(() => {
    setTypeFilters(activeFilters);
  }, [activeFilters]);

  return (
    <div className="flex gap-2 items-center overflow-x-auto snap-x snap-mandatory scrollbar-hide">
      {["public", "owned", "favorites"].map((filter) => (
        <FilterTagItem
          key={filter}
          handleFilter={() => toggleFilter(filter)}
          closeTag={() => closeFilter(filter)}
          isActive={activeFilters.includes(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </FilterTagItem>
      ))}
    </div>
  );
};

export default FilterTags;
