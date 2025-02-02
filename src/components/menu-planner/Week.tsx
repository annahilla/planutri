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
    <div className="flex flex-col md:flex-row">
      {days.map((day) => (
        <Day key={day} name={day} />
      ))}
    </div>
  );
};

export default Week;
