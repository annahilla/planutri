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
      className="text-neutral-100 flex gap-2 bg-brown py-2 px-4 items-center rounded hover:bg-lightBrown"
    >
      {icon}
      <p className="hidden md:block">{children}</p>
    </button>
  );
};

export default DashboardButton;
