const Logo = ({ color }: { color: "white" | "black" }) => {
  return (
    <div className="relative font-balginLight tracking-widest">
      <p>plantry</p>
      <div
        className={`absolute top-[115%] left-1/2 transform -translate-x-1/2 bg-${color} w-[15%] h-[2%]`}
      ></div>
    </div>
  );
};

export default Logo;
