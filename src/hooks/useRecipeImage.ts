import { useState, useEffect } from "react";

const useRecipeImage = (recipeName: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${recipeName}&client_id=${process.env.UNSPLASH_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        
        const data = await response.json();

        if (data && data[0] && data[0].urls) {
          setImageUrl(data[0].urls.regular);
        } else {
          setError("No image found for this recipe.");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError("Failed to load image.");
        console.error("Error fetching image from Unsplash:", err);
      }
    };

    if (recipeName) {
      fetchImage();
    }
  }, [recipeName]);

  return { imageUrl, error };
};

export default useRecipeImage;
