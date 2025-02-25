import { fetchShoppingListServer } from "@/services/shoppingListFetching";
import { cookies } from "next/headers";
import ShoppingListPageClient from "@/components/shopping-list/ShoppingListPageClient";

const ShoppingListPage = async () => {
  const token = (await cookies()).get("token")?.value;
  const shoppingList = token ? await fetchShoppingListServer(token) : [];

  return (
    <div className="h-full">
      <ShoppingListPageClient shoppingList={shoppingList} />
    </div>
  );
};

export default ShoppingListPage;
