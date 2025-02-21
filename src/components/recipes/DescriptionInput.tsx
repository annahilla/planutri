import { useEffect, useRef } from "react";

interface DescriptionInputProps {
  editMode: boolean;
  description: string | undefined;
  setDescription: (description: string) => void;
}

const DescriptionInput = ({
  editMode,
  description,
  setDescription,
}: DescriptionInputProps) => {
  const editableRef = useRef<HTMLSpanElement>(null);

  const handleInputChange = () => {
    if (editableRef.current) {
      setDescription(editableRef.current.innerText);
    }
  };

  useEffect(() => {
    if (editableRef.current && description) {
      editableRef.current.innerText = description;
    }
  }, [description]);

  return (
    <div className="flex-1 flex flex-col w-full">
      <h5 className="text-xl mb-3">Description</h5>
      {editMode ? (
        <span
          ref={editableRef}
          className="whitespace-pre-wrap border p-5 rounded outline-none w-full flex-1 h-fit"
          onInput={handleInputChange}
          contentEditable
          suppressContentEditableWarning={true}
        >
          {description}
        </span>
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
