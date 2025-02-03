import { useState, useEffect } from "react"

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);

    useEffect(() => {
        const fetchIngredients = async () => {
          const response = await fetch("http://localhost:3000/api/ingredients");
          const data = await response.json();
          const ingredients = data[0].ingredients;
          setIngredients(ingredients);
        };
        fetchIngredients();
      }, []);

    return ingredients;
}