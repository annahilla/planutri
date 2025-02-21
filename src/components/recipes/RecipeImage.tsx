import Image from "next/image";
import useRecipeImage from "@/hooks/useRecipeImage";
import Loader from "../ui/Loader";

const RecipeImage = ({ recipe }: { recipe: string }) => {
  const { imageUrl, loading } = useRecipeImage(recipe);

  return (
    <div className="mb-6 mb-6 relative w-full h-96 rounded overflow-hidden">
      {loading && <Loader />}
      {imageUrl && (
        <Image src={imageUrl} alt={recipe} layout="fill" objectFit="cover" />
      )}
    </div>
  );
};

export default RecipeImage;
