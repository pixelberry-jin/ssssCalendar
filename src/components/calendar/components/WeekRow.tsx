import React from "react";
import DateCellComponent from "./DateCell";

interface IWeekRowProps {
  startDay: number;
  prevMonthLastDate: number;
  monthEndDate: number;
  onDateChange: (day: number) => void;
}

// 일주일 동안의 날짜들을 표시하는 컴포넌트
const WeekRowComponent: React.FC<IWeekRowProps> = ({
  startDay,
  prevMonthLastDate,
  monthEndDate,
  onDateChange,
}) => {
  const days = Array.from({ length: 7 }, (_, i) => startDay + i);
  return (
    <tr>
      {days.map((day, i) => {
        let dateToShow = day;
        let isCurrentMonth = true;

        if (day <= 0) {
          dateToShow = prevMonthLastDate + day;
          isCurrentMonth = false;
        } else if (day > monthEndDate) {
          dateToShow = day - monthEndDate;
          isCurrentMonth = false;
        }

        return (
          <DateCellComponent
            key={i}
            date={dateToShow}
            dayIndex={i}
            isCurrentMonth={isCurrentMonth}
            onDateChange={() => onDateChange(day)}
          />
        );
      })}
    </tr>
  );
};

export default WeekRowComponent;
