export const fetchUnits = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/units`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching units");
    }
    const data = await response.json()
    return data[0].units;
  } catch (error) {
    console.error(error);
    throw error;
  }
};