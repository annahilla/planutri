export const getFavoriteRecipes = async () => {
  try {
    const response = await fetch("/api/user/recipes/favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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


export const addFavoriteRecipe = async (recipeId: string) => {
    try {
        const response = await fetch("/api/user/recipes/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({recipeId}),
        });
        
        if (!response.ok) {
          throw new Error("Error adding recipe to favorites");
        }
    
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export const deleteFavoriteRecipe = async (recipeId: string) => {
    try {
        const response = await fetch(`/api/user/recipes/favorites/${recipeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Error deleting favorite recipe");
        }
    
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
}