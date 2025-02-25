import { useAppDispatch, useAppSelector } from "@/lib/store/reduxHooks";
import { setCollapsed } from "@/lib/store/sidebar/sidebarSlice";
import { PiSidebarSimpleLight } from "react-icons/pi";

const CollapseNavbarButton = () => {
  const dispatch = useAppDispatch();
  const isNavbarCollapsed = useAppSelector(
    (state) => state.sidebar.isCollapsed
  );

  const toggleNavbar = () => {
    dispatch(setCollapsed({ value: !isNavbarCollapsed }));
  };

  return (
    <button
      onClick={toggleNavbar}
      type="button"
      className={`${
        isNavbarCollapsed ? "justify-center mb-6" : "justify-end"
      } mb-2 w-full px-3 hover:opacity-70 hidden outline-none md:flex`}
    >
      <PiSidebarSimpleLight />
    </button>
  );
};

export default CollapseNavbarButton;
