import { GrCircleAlert } from "react-icons/gr";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div role="error" className="inline-flex items-center text-sm text-red-500">
      <GrCircleAlert
        size={13}
        className="flex flex-shrink-0 w-4 h-4 inline-block mr-1"
      />
      {message}
    </div>
  );
};

export default ErrorMessage;
