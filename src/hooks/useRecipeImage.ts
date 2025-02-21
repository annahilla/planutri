import { useState, useEffect } from "react";

const useRecipeImage = (query: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgError, setImgError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async (query: string) => {
  if (!query) return;

  setLoading(true);
  setImgError(null);

  try {
    const response = await fetch(`/api/recipe-image?query=${query}`);

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    if (data.imageUrl) {
      setImageUrl(data.imageUrl);
    } else {
      setImgError('No image found');
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    setImgError('Error fetching image');
  } finally {
    setLoading(false);
  }
};


    fetchImage(query);
  }, [query]);

  return { imageUrl, loading, imgError };
};

export default useRecipeImage;
