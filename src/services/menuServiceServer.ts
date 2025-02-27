import { cookies } from "next/headers";

export async function fetchMenu() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`, {
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

    const menu = await response.json();
    return menu;
  } catch(error) {
    console.error(error);
    throw error;
  }
}