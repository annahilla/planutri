const Logo = ({ color }: { color: "white" | "black" }) => {
  const bgColor = color === "white" ? "white" : "black";

  return (
    <div className="relative font-balginLight tracking-widest">
      <p>plantry</p>
      <div
        className={`absolute top-[115%] left-1/2 transform -translate-x-1/2 bg-${bgColor} w-[15%] h-[2%]`}
      ></div>
    </div>
  );
};

export default Logo;
