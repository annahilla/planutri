import MenuHeader from "@/components/menu-planner/MenuHeader";
import { fetchMenu } from "@/services/menuServiceServer";
import { fetchRecipes } from "@/services/recipeServiceServer";
import { MenuProvider } from "@/context/MenuContext";
import Week from "@/components/menu-planner/Week";
import Loader from "@/components/ui/Loader";

const MenuPage = async () => {
  const menu = await fetchMenu();
  const recipes = await fetchRecipes();

  if (!menu || !recipes) {
    return <Loader />;
  }

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
