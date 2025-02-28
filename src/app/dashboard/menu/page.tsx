import Week from "@/components/menu-planner/Week";
import MenuHeader from "@/components/menu-planner/MenuHeader";
import { fetchMenu } from "@/services/menuServiceServer";
import { fetchRecipes } from "@/services/recipeServiceServer";
import { MenuProvider } from "@/context/MenuContext";

const MenuPage = async () => {
  const menu = await fetchMenu();
  const recipes = await fetchRecipes();

  return (
    <div className="w-full flex flex-col gap-2">
      <MenuProvider fetchedMenu={menu} fetchedRecipes={recipes}>
        <MenuHeader />
        <Week />
      </MenuProvider>
    </div>
  );
};

export default MenuPage;
