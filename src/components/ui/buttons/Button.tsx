interface ButtonProps {
  children: React.ReactNode;
  filled?: boolean;
  type?: "submit" | "button";
  color?: "black" | "white";
  handleClick?: (() => void) | ((id: string) => Promise<void>);
}

const colors: Record<string, string> = {
  black: "text-black border-black",
  white: "text-white border-white",
};

const Button = ({
  children,
  filled,
  type,
  color = "black",
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${filled ? "bg-black border-0" : ""} ${
        colors[color] || "text-white border-white"
      } border px-3 py-2 w-full tracking-wider hover:opacity-70`}
      onClick={handleClick ? () => handleClick("some-id") : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
