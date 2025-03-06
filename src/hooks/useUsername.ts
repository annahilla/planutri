"use client";

import { getRecipeUsername } from "@/services/recipeService";
import { RecipeInterface } from "@/types/types";
import { useEffect, useState } from "react";

const useUsername = (recipe: RecipeInterface) => {
      const [username, setUsername] = useState("");
        const [loading, setLoading] = useState(true);

    
      useEffect(() => {
        if (!recipe || !recipe._id) return;
    
        const getUsername = async () => {
          try {
            const username = await getRecipeUsername(recipe._id);
            setUsername(username);
          } catch (error) {
            console.error("Error fetching username:", error);
          } finally {
            setLoading(false);
          }
        };
    
        getUsername();
      }, [recipe]);

      return {loading, username}
}

export default useUsername;