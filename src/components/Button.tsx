const Button = ({ children }: { children: React.ReactNode }) => {
    return (
      <button className="border px-3 py-2 text-neutral-600 border-neutral-500">
        {children}
      </button>
    );
  };
  
  export default Button;