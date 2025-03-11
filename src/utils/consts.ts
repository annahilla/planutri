export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const getPexelsApiUrl = (recipeName: string): string => 
  `https://api.pexels.com/v1/search?query=${recipeName.toLowerCase()}&orientation=landscape&per_page=1`;
