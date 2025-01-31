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
  