import { IoAddOutline } from "react-icons/io5";

const Day = ({ name }: { name: string }) => {
  const meals = ["breakfast", "lunch", "snack", "dinner"];

  return (
    <div className="flex flex-col">
      <div
        className={`my-2 ${
          name === "Monday" ? "md:ml-14" : ""
        } text-center font-bold text-sm text-neutral-500`}
      >
        {name}
      </div>
      <div className="h-[0.5px] w-full bg-neutral-400 hidden md:block"></div>

      <div className="p-4 flex flex-col gap-2 w-full md:mt-2">
        {meals.map((meal) => (
          <div key={meal} className="flex items-center gap-2">
            <span
              className={`text-xs capitalize w-20 md:w-14 ${
                name === "Monday" ? "md:block" : "md:hidden"
              }`}
            >
              {meal}
            </span>
            <div className="outline-none w-full flex items-center justify-center text-neutral-300 text-[0.65rem] md:w-[8.5rem]">
              <button className="flex gap-1 items-center hover:bg-neutral-50 p-2 rounded">
                <IoAddOutline />
                <p>Add recipe</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
