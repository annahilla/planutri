const Day = ({ name }: { name: string }) => {
  const meals = ["Breakfast", "Lunch", "Snack", "Dinner"];

  return (
    <div className="w-auto">
      <h5 className="my-2 text-sm font-bold text-left">{name}</h5>
      <div className="bg-neutral-50 px-3 py-4 rounded text-center">
        <div className="flex flex-col items-center gap-4">
          {meals.map((meal) => (
            <div
              className="flex flex-col items-start gap-1 rounded w-full text-left"
              key={meal}
            >
              <p className="text-sm">{meal}</p>
              <button className="text-left text-neutral-300 text-xs bg-white w-full p-2 border border-white hover:text-neutral-400 hover:border-neutral-300 rounded">
                + Add recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Day;
