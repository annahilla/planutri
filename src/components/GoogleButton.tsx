import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center gap-2 border border-neutral-300 p-3 text-sm w-full"
  >
    <FcGoogle size={22} />
    Continue with Google
  </button>
);

export default GoogleButton;
