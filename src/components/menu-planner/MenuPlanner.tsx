import Week from "./Week";

const MenuPlanner = () => {
  return (
    <div className="flex flex-col my-6 mx-4">
      <Week />
      <div className="my-8 h-[1px] w-full bg-neutral-400 md:hidden"></div>
      <Week />
    </div>
  );
};

export default MenuPlanner;
