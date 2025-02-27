import ShoppingListPageClient from "@/components/shopping-list/ShoppingListPageClient";
import { fetchMenu } from "@/services/menuServiceServer";
import { fetchShoppingListServer } from "@/services/shoppingListServiceServer";

const ShoppingListPage = async () => {
  const shoppingList = await fetchShoppingListServer();
  const menu = await fetchMenu();

  return (
    <div className="h-full">
      <ShoppingListPageClient menu={menu} shoppingList={shoppingList} />
    </div>
  );
};

export default ShoppingListPage;
