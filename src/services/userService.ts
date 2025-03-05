import { cookies } from "next/headers";


export const getUser = async () => {
  const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `session=${sessionCookie?.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error getting user data");
    }
    const data = await response.json()
    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};