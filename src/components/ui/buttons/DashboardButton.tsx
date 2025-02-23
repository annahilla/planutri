import { ReactElement, ReactNode } from "react";

const DashboardButton = ({
  icon,
  children,
  handleClick,
}: {
  icon: ReactElement;
  children: ReactNode;
  handleClick?: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className="text-neutral-200 text-sm flex gap-2 bg-brown p-2 items-center rounded hover:bg-lightBrown md:py-2 md:px-4"
    >
      {icon}
      <p className="hidden md:block">{children}</p>
    </button>
  );
};

export default DashboardButton;
