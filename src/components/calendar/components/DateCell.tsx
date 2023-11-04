import { useEffect } from "react";
import EmptyDateCellComponent from "./EmptyDateCellComponent";
import AddableDateCellComponent from "./AddableDateCellComponent";

interface IDateCellProps {
  date: number;
  dayIndex: number;
  isCurrentMonth: boolean;
  onDateChange: () => void;
}

// 날짜를 표시하는 컴포넌트
const DateCellComponent: React.FC<IDateCellProps> = ({
  date,
  dayIndex,
  isCurrentMonth,
  onDateChange,
}) => {
  useEffect(() => {
    onDateChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isCurrentMonth ? (
    <AddableDateCellComponent date={date} dayIndex={dayIndex} />
  ) : (
    <EmptyDateCellComponent date={date} />
  );
};

export default DateCellComponent;
