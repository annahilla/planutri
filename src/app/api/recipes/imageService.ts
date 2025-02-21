export class imageService {

  async generateImage(recipeName: string): Promise<string | null> {
    const apiKey = process.env.PEXELS_API_KEY;

    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${recipeName.toLowerCase()}&orientation=landscape&per_page=1`, {
      headers: {
        Authorization: `${apiKey}`,
      },
    });
      
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const data = await response.json();
      const image = data.photos[0]?.src?.original;
      
      return image;
    } catch (error) {
      console.error('Error generating image URL:', error);
      return null;
    }
  }
}
