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
    <div className="grid grid-row w-full md:grid-cols-[auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
      {days.map((day) => (
        <Day key={day} name={day} />
      ))}
    </div>
  );
};

export default Week;
