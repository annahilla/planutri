import Week from "@/components/menu-planner/Week";

const Menu = () => {
  return (
    <div className="w-full flex flex-col my-6 md:ml-[17rem]">
      <Week />
      <div className="my-8 h-[1px] w-full bg-neutral-400 md:hidden"></div>
      <Week />
    </div>
  );
};

export default Menu;
