import { ReactNode } from "react";

const DashboardHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center mb-4 md:mb-6">
      {children}
    </div>
  );
};

export default DashboardHeader;
