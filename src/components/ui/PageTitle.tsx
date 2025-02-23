import { ReactNode } from "react";

const PageTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-2xl text-black">{children}</h2>;
};

export default PageTitle;
