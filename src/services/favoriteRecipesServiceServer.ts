import { cookies } from "next/headers";

export const fecthFavoriteRecipes = async () => {
    const cookieStore = await cookies();
      const sessionCookie = cookieStore.get("session");
      
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/recipes/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `session=${sessionCookie?.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching favorite recipes");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return [];
    }

    const favoriteRecipes = data[0]?.recipeIds ?? []; 

    return favoriteRecipes;
  } catch (error) {
    console.error(error);
    return []; 
  }
};