import { ReactElement } from "react";

const IconButton = ({
  icon,
  handleClick,
}: {
  icon: ReactElement;
  handleClick: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className="hover:bg-neutral-100 rounded-full p-1 text-xs"
    >
      {icon}
    </button>
  );
};

export default IconButton;
