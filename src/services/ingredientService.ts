export const fetchIngredients = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ingredients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching ingredients");
    }
    const data = await response.json();
    return data[0].ingredients;
  } catch (error) {
    console.error(error);
    throw error;
  }
};