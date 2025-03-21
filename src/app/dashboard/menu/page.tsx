import MenuHeader from "@/components/menu-planner/MenuHeader";
import { fetchMenu } from "@/services/menuServiceServer";
import { fetchRecipes } from "@/services/recipeServiceServer";
import { MenuProvider } from "@/context/MenuContext";
import Week from "@/components/menu-planner/Week";
import Loader from "@/components/ui/Loader";

const MenuPage = async () => {
  const [menuResult, recipesResult] = await Promise.allSettled([
    fetchMenu(),
    fetchRecipes(),
  ]);

  if (
    menuResult.status !== "fulfilled" ||
    recipesResult.status !== "fulfilled"
  ) {
    return <Loader />;
  }
  //
  return (
    <div className="w-full flex flex-col gap-2">
      <MenuProvider
        fetchedMenu={menuResult.value}
        fetchedRecipes={recipesResult.value}
      >
        <MenuHeader />
        <Week />
      </MenuProvider>
    </div>
  );
};

export default MenuPage;
