import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef } from "react";

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaRows = () => {
    if (textareaRef.current) {
      textareaRef.current.rows = 1;

      const newRows = Math.ceil(textareaRef.current.scrollHeight / 28);
      textareaRef.current.rows = newRows;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    adjustTextareaRows();
  };

  useEffect(() => {
    adjustTextareaRows();
  }, [description]);

  useEffect(() => {
    adjustTextareaRows();
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full">
      <h5 className="text-xl mb-3">Description</h5>
      {isEditMode ? (
        <textarea
          ref={textareaRef}
          className="whitespace-pre-wrap border p-5 rounded outline-none w-full flex-1 resize-none"
          onChange={handleInputChange}
          value={description}
        />
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
