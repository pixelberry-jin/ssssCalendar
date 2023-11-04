import { useState } from "react";

interface IAddableDateCellProps {
  date: number;
  dayIndex: number;
}

const AddableDateCellComponent: React.FC<IAddableDateCellProps> = ({
  date,
  dayIndex,
}) => {
  const [isClicked, setClickedStatus] = useState<boolean>(false);

  const defaultClassName =
    dayIndex === 0 ? "text-red-500" : dayIndex === 6 ? "text-blue-500" : "";
  const clickedClassName =
    dayIndex === 0
      ? "bg-red-500 text-white"
      : dayIndex === 6
      ? "bg-blue-500 text-white"
      : "";

  const handleClickDate = () => {
    setClickedStatus(true);
  };

  return (
    <td className="date" onClick={handleClickDate}>
      <div className="date__wrapper">
        <span
          className={`text-sm inline-block w-6 h-6 rounded-full text-center leading-7 ${
            isClicked ? clickedClassName : defaultClassName
          }`}
        >
          {date}
        </span>
      </div>
    </td>
  );
};

export default AddableDateCellComponent;
