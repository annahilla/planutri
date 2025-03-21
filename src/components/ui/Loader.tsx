const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-xs">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-lightBrown rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-lightBrown rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-lightBrown rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;
