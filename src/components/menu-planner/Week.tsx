import Day from "./Day";

const Week = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="h-full invisible-scrollbar flex overflow-x-auto scrollbar-none snap-x snap-mandatory w-full md:grid md:grid-cols-2 ld:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 md:overflow-x-hidden gap-3">
      {days.map((day) => (
        <div
          key={day}
          className="flex flex-col h-full justify-between min-w-full snap-start md:h-auto md:min-w-0"
        >
          <Day name={day} />
        </div>
      ))}
    </div>
  );
};

export default Week;
