"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { useRecipe } from "@/context/RecipeContext";
import defaultImage from "../../../../public/default-image.png";

const RecipeImage = ({
  imageUrl,
  height = "h-96",
}: {
  imageUrl: string | undefined;
  height: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { recipe } = useRecipe();

  const handleImageError = () => {
    setIsError(true);
  };

  return (
    <div className={`relative w-full rounded overflow-hidden ${height}`}>
      {isLoading && <Skeleton height="100%" width="100%" />}
      <Image
        src={isError || !imageUrl ? defaultImage : imageUrl}
        alt={recipe.name}
        fill
        priority
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
      />
    </div>
  );
};

export default RecipeImage;
