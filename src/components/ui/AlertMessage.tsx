import { CiCircleInfo } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const AlertMessage = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) => {
  return (
    <div className="text-neutral-600 bg-neutral-100 w-full p-2 text-xs flex items-start justify-between border-l-4 border-neutral-300 md:text-sm gap-2 sm:items-center">
      <div className="flex gap-2 sm:items-center">
        <CiCircleInfo size={21} />
        <p>{text}</p>
      </div>
      <button onClick={handleClick}>
        <IoMdClose />
      </button>
    </div>
  );
};

export default AlertMessage;
