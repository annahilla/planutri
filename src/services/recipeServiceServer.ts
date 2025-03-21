import { cookies } from "next/headers";

export async function fetchRecipes(page?: number, search: string = "", mealFilter: string = "", sort: string = "alphabetical", filter:string[] = [], limit=12) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/recipes`;
  if (page && limit) {
    url += `?page=${page}&search=${search}&meal=${mealFilter}&filter=${filter}&sort=${sort}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `session=${sessionCookie?.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching recipes");
    }

    const data = await response.json();
    return page && limit ? data : data.recipes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchRecipe(recipeId: string) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${recipeId}`, {
      method: "GET",
      headers: { 
      "Content-Type": "application/json",
      "Cookie": `session=${sessionCookie?.value}`,
      },
      credentials: "include",
    });

  if (!response.ok) {
      throw new Error("Error fetching recipe");
    }

    const recipes = await response.json();
    return recipes;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export const getRecipeUsername = async (recipeId: string | unknown) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  if(!recipeId) {return}
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${recipeId}/username`,{
          method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cookie": `session=${sessionCookie?.value}`,
            },
          credentials: "include"
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error("Failed to fetch username");
        }
        return data.username;
    } catch (error) {
        console.error("Error fetching username:", error);
    }
};
