"use client";

import Image from "next/image";
import { RecipeInterface } from "@/types/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

const RecipeImage = ({
  recipe,
  imageUrl,
  height = "h-96",
}: {
  recipe: RecipeInterface;
  imageUrl: string | undefined;
  height: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full rounded overflow-hidden ${height}`}>
      {isLoading && <Skeleton height="100%" width="100%" />}
      <Image
        src={imageUrl ? imageUrl : "/default-image.png"}
        alt={recipe.name}
        fill
        priority
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default RecipeImage;
