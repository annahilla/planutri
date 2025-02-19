import { IoMdAdd } from "react-icons/io";

const AddButton = ({
  handleClick,
  item,
}: {
  handleClick: () => void;
  item: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-neutral-100 text-neutral-500 text-xs p-2 rounded hover:opacity-80"
    >
      <IoMdAdd />
      Add {item}
    </button>
  );
};

export default AddButton;
