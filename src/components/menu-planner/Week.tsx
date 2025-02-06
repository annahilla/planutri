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
    <div>
      <table>
        <thead>
          <tr>
          <th></th>
          {days.map(day => (
            <th className="px-6 py-3 font-lighter text-neutral-800">{day}</th>
          ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-neutral-600 font-light px-6 py-3">Breakfast</td>
          </tr>
          <tr>
            <td className="text-neutral-600 font-light px-6 py-3">Lunck</td>
          </tr>
          <tr>
            <td className="text-neutral-600 font-light px-6 py-3">Snack</td>
          </tr>
          <tr>
            <td className="text-neutral-600 font-light px-6 py-3">Dinner</td>
          </tr>
        </tbody>
      </table>
 
    </div>
  );
};

export default Week;
