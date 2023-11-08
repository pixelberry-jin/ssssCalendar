import { useEffect } from "react";
import EmptyDateCellComponent from "./EmptyDateCellComponent";
import AddableDateCellComponent from "./AddableDateCellComponent";
import { getFullDate } from "@/utils/getFullDate";

interface IDateCellProps {
  year: number;
  month: number;
  date: number;
  dayIndex: number;
  isCurrentMonth: boolean;
  onDateChange: () => void;
}

// 날짜를 표시하는 컴포넌트
const DateCellComponent: React.FC<IDateCellProps> = ({
  year,
  month,
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
    <AddableDateCellComponent
      year={year}
      month={month}
      date={date}
      dayIndex={dayIndex}
    />
  ) : (
    <EmptyDateCellComponent
      year={year}
      month={month}
      date={date}
      dayIndex={dayIndex}
    />
  );
};

export default DateCellComponent;
