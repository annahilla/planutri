const Button = ({
  children,
  filled,
  type,
}: {
  children: React.ReactNode;
  filled?: boolean;
  type?: "submit" | "button";
}) => {
  return (
    <button
      type={type}
      className={`${
        filled && `bg-black`
      } text-white border border-white px-3 py-2 w-full tracking-wider hover:opacity-70`}
    >
      {children}
    </button>
  );
};

export default Button;
