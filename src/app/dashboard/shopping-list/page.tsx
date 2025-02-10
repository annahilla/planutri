import { LuConstruction } from "react-icons/lu";

const ShoppingList = () => {
  return (
    <div className="h-[70vh]">
      <h2 className="text-2xl">Shopping List</h2>
      <div className="my-7 flex flex-col items-center gap-4 justify-center h-full bg-white rounded">
        <LuConstruction size={45} />
        <p className=" text-2xl">On construction</p>
      </div>
    </div>
  );
};

export default ShoppingList;
