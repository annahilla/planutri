export const ToggleSwitch = ({
  isOn,
  setIsOn,
}: {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
}) => {
  return (
    <div>
      <button
        onClick={() => setIsOn(!isOn)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          isOn ? "bg-lightBrown" : "bg-gray-300"
        } focus:outline-none`}
        aria-pressed={isOn}
        type="button"
      >
        <span
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        ></span>
      </button>
    </div>
  );
};
