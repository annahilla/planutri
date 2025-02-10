import { ReactNode } from "react";

const PageTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-4 text-2xl md:mb-5 text-black">{children}</h2>;
};

export default PageTitle;
