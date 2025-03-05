import { FiEdit2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

const ProfileItem = ({
  isLoading,
  item,
  value,
  setValue,
  editable = false,
  isEditableMode = false,
  changeEditableMode,
}: {
  isLoading: boolean;
  item: string;
  value: string | undefined | null;
  setValue?: (value: string) => void;
  editable?: boolean;
  isEditableMode?: boolean;
  changeEditableMode?: () => void;
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <Skeleton height="100%" width="100%" />;
    }

    if (isEditableMode && setValue) {
      return (
        <input
          className="border outline-none w-full p-1 text-neutral-600 rounded"
          type="text"
          value={value || ""}
          onChange={(event) => setValue?.(event.target.value)}
        />
      );
    }

    if (editable && value) {
      return (
        <button onClick={changeEditableMode} className="p-1 text-neutral-800">
          {value}
        </button>
      );
    }

    if (editable && !value) {
      return (
        <button
          onClick={changeEditableMode}
          className="cursor-pointer text-neutral-400"
        >
          {`Add ${item}`}
        </button>
      );
    }

    return <p className="p-1 text-neutral-800">{value}</p>;
  };

  return (
    <div className="w-full h-5 flex gap-3 justify-between items-center group">
      <div className="w-full h-full">
        <div className="flex gap-2 items-center w-full">
          <p className="font-bold">{item}:</p>
          {renderContent()}
        </div>
      </div>
      {editable && (
        <button
          onClick={changeEditableMode}
          className="mt-4 md:hidden text-neutral-800 group-hover:block"
          type="button"
        >
          <FiEdit2 size={12} />
        </button>
      )}
    </div>
  );
};

export default ProfileItem;
