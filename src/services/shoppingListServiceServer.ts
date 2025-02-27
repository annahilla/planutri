import { cookies } from "next/headers";

export async function fetchShoppingListServer() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shopping-list`, {
      method: "GET",
      headers: { 
      "Content-Type": "application/json",
      "Cookie": `session=${sessionCookie?.value}`,
      },
      credentials: "include"
  });

  if (!response.ok) throw new Error("Failed to fetch shopping list");

  const data = await response.json();
    
    if(data.length > 0) {
      const shoppingList = data[0].list;
      return shoppingList;
    } else {
      return [];
    }

  } catch(error) {
    console.error(error);
    throw error;
  }
}