import {
  CiCalendar,
  CiShoppingBasket,
  CiSquarePlus,
  CiViewList,
} from "react-icons/ci";
import SideNavbarItem from "./SideNavbarItem";

const SideNavbarItems = () => {
  return (
    <ul className="flex w-full md:flex-col md:my-10">
      <SideNavbarItem
        name="Meal Planner"
        href="/dashboard/menu"
        icon={<CiCalendar size={22} />}
      />
      <SideNavbarItem
        name="Shopping List"
        href="/dashboard/shopping-list"
        icon={<CiShoppingBasket size={22} />}
      />
      <SideNavbarItem
        name="Recipes"
        href="/dashboard/recipes"
        icon={<CiViewList size={22} />}
      />
      <SideNavbarItem
        name="Create Recipe"
        href="/dashboard/create-recipe"
        icon={<CiSquarePlus size={22} />}
      />
    </ul>
  );
};

export default SideNavbarItems;
