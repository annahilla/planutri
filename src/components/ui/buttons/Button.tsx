interface ButtonProps {
  children: React.ReactNode;
  filled?: boolean;
  bg?: string;
  rounded?: boolean;
  type?: "submit" | "button";
  color?: "black" | "white" | "brown";
  handleClick?: (() => void) | ((id: string) => Promise<void>);
  disabled?: boolean;
}

const colors: Record<string, string> = {
  black: "text-black border-black",
  white: "text-white border-white",
  brown: "text-brown border-brown",
};

const Button = ({
  children,
  filled,
  type,
  rounded = false,
  bg,
  color = "black",
  disabled = false,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${filled ? `bg-${bg ? bg : "black"} border-0` : ""} ${
        colors[color] || "text-white border-white"
      } border px-3 py-2 w-full tracking-wider hover:opacity-70 ${
        rounded && "rounded-full"
      }`}
      onClick={handleClick ? () => handleClick("some-id") : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
