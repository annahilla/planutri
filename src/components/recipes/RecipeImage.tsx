import Image from "next/image";
import { RecipeInterface } from "@/types/types";
const RecipeImage = ({
  recipe,
  height = "h-96",
}: {
  recipe: RecipeInterface;
  height: string;
}) => {
  return (
    <div className={`relative w-full rounded overflow-hidden ${height}`}>
      <Image
        src={recipe.imageUrl ? recipe.imageUrl : "/default-image.png"}
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
