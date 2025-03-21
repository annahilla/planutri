import FilterTagItem from "./FilterTagItem";
import { useSearchParams } from "next/navigation";

const FilterTags = () => {
  const searchParams = useSearchParams();
  const filters = (searchParams.get("filter")?.split(",") as string[]) || [];

  const handleFilterClick = (filter: string) => {
    let updatedFilters = [...filters];

    if (filter === "all") {
      updatedFilters = [];
      updateURLParams(updatedFilters, true);
      return;
    }

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

    updateURLParams(updatedFilters);
  };

  const updateURLParams = (updatedFilters: string[], clearSearch = false) => {
    const urlParams = new URLSearchParams(window.location.search);

    if (updatedFilters.length) {
      urlParams.set("filter", updatedFilters.join(","));
    } else {
      urlParams.delete("filter");
    }

    if (clearSearch) {
      urlParams.delete("search");
    }

    window.history.replaceState(null, "", "?" + urlParams.toString());
  };

  const getSelectedResults = (filter: string) => {
    if (filter === "all" && filters.length === 0) {
      return true;
    }
    return filters.includes(filter);
  };

  return (
    <div className="flex gap-2 items-center overflow-x-auto snap-x snap-mandatory scrollbar-hide">
      {["all", "public", "owned", "favorites"].map((filter) => (
        <FilterTagItem
          key={filter}
          handleFilter={() => handleFilterClick(filter)}
          closeTag={() => handleFilterClick(filter)}
          isActive={getSelectedResults(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </FilterTagItem>
      ))}
    </div>
  );
};

export default FilterTags;
