import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

const FilterTagItem = ({
  children,
  handleFilter,
  closeTag,
  isActive,
  isStatic = false,
}: {
  children: ReactNode;
  handleFilter?: () => void;
  closeTag?: () => void;
  isActive: boolean;
  isStatic?: boolean;
}) => {
  return (
    <button
      onClick={isActive ? closeTag : handleFilter}
      className={`h-8 outline-none flex gap-2 py-1 justify-between items-center rounded-full text-sm transition-all ease-out duration-500  ${
        isActive && !isStatic ? "text-neutral-200 pl-3 pr-1" : "border px-3"
      } ${isActive && "bg-lightBrown text-neutral-200"}
      `}
      type="button"
    >
      {children}
      {isActive && !isStatic && <IoIosClose onClick={closeTag} size={24} />}
    </button>
  );
};

export default FilterTagItem;
