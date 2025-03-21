import { ReactElement } from "react";

const IconButton = ({
  icon,
  onClick,
  disabled = false,
  variant,
}: {
  icon: ReactElement;
  onClick: () => void;
  disabled?: boolean;
  variant: "filled" | "outline" | "invisible";
}) => {
  if (variant === "invisible") {
    return (
      <button
        onClick={onClick}
        className="hover:bg-neutral-100 rounded-full p-1 text-xs disabled:text-neutral-400 disabled:hover:bg-transparent"
        disabled={disabled}
      >
        {icon}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-2 rounded-full 
          ${variant === "filled" && "w-8 h-8 bg-brown text-white"}
          ${
            variant === "outline" &&
            "w-8 h-8 border border-brown text-brown bg-white"
          }
        `}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;
