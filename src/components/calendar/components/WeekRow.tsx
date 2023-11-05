import React from "react";
import DateCellComponent from "./DateCell";

interface IWeekRowProps {
  year: number;
  month: number;
  startDay: number;
  prevMonthLastDate: number;
  monthEndDate: number;
  onDateChange: (day: number) => void;
}

// 일주일 동안의 날짜들을 표시하는 컴포넌트
const WeekRowComponent: React.FC<IWeekRowProps> = ({
  year,
  month,
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
        let monthToShow = month;

        if (day <= 0) {
          dateToShow = prevMonthLastDate + day;
          monthToShow = monthToShow - 1;
          isCurrentMonth = false;
        } else if (day > monthEndDate) {
          dateToShow = day - monthEndDate;
          monthToShow = monthToShow + 1;
          isCurrentMonth = false;
        }

        return (
          <DateCellComponent
            key={i}
            year={year}
            month={monthToShow}
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
