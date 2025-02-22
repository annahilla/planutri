import Image from "next/image";
import { RecipeInterface } from "@/types/types";
const RecipeImage = ({
  recipe,
  imageUrl,
  height = "h-96",
}: {
  recipe: RecipeInterface;
  imageUrl: string | undefined;
  height: string;
}) => {
  return (
    <div className={`relative w-full rounded overflow-hidden ${height}`}>
      <Image
        src={imageUrl ? imageUrl : "/default-image.png"}
        alt={recipe.name}
        fill
        priority
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
};

export default RecipeImage;
