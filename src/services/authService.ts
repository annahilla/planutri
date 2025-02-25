export const sendTokenToBackend = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ data: 'additionalPayload' })  
      });
  
      if (!response.ok) {
        throw new Error('Failed to send request to backend');
      }
  
      const data = await response.json(); 
      return data; 
    } catch (error) {
      console.error('Error sending token to backend:', error);
      throw error;  
    }
  };

  export async function refreshToken(refreshToken: string) {
  try {
    const res = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );

    const data = await res.json();
    return {
      idToken: data.id_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
