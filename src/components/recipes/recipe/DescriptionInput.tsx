import { useSearchParams } from "next/navigation";
import TextAreaResizable from "@/components/forms/TextAreaResizable";

interface DescriptionInputProps {
  description: string | undefined;
  setDescription: (description: string) => void;
}

const DescriptionInput = ({
  description,
  setDescription,
}: DescriptionInputProps) => {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  return (
    <div className="flex-1 flex flex-col w-full">
      <h5 className="text-xl mb-3">Description</h5>
      {isEditMode ? (
        <TextAreaResizable value={description} setValue={setDescription} />
      ) : (
        <span className="whitespace-pre-wrap border text-neutral-900 rounded p-5">
          {description
            ? description
            : "There isn't a description for this recipe, if you want to add one you can edit the recipe."}
        </span>
      )}
    </div>
  );
};

export default DescriptionInput;
