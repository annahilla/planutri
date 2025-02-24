import { GrCircleAlert } from "react-icons/gr";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div role="error" className="flex gap-1 items-center text-sm text-red-500">
      <GrCircleAlert />
      {message}
    </div>
  );
};

export default ErrorMessage;
