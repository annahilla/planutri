import Image from "next/image";
import useRecipeImage from "@/hooks/useRecipeImage";
import Loader from "../ui/Loader";

const RecipeImage = ({
  recipe,
  height = "h-96",
}: {
  recipe: string;
  height: string;
}) => {
  const { imageUrl, loading } = useRecipeImage(recipe);

  return (
    <div className={`relative w-full rounded overflow-hidden ${height}`}>
      {loading && <Loader />}
      {imageUrl && (
        <Image src={imageUrl} alt={recipe} layout="fill" objectFit="cover" />
      )}
    </div>
  );
};

export default RecipeImage;
