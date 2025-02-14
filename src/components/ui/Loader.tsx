import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
      <BeatLoader color="#545046" />
    </div>
  );
};
export default Loader;
