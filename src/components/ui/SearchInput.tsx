import { ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = ({
  search,
}: {
  search: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="my-6 relative">
      <input
        className="border px-10 py-2 rounded-full w-full outline-none font-light shadow-sm"
        type="text"
        name="recipe"
        placeholder="Search recipe"
        onChange={search}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
        <CiSearch />
      </div>
    </div>
  );
};

export default SearchInput;
