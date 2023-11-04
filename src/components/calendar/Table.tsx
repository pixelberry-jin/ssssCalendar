import React, { useState, useEffect, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  LEAP_YEAR_END_DAY_LIST,
  NOT_LEAP_YEAR_END_DAY_LIST,
} from "@/constants";
import WeekRowComponent from "./components/WeekRow";
import { currentSelector } from "@/selectors/currentSelector";
import { useDrawCalendar } from "@/hooks/useDrawCalendar";

const CalendarComponent: React.FC = () => {
  const { drawTodayCalendar, drawNextCalendar, drawPrevCalendar } =
    useDrawCalendar();
  const { year, month, monthIndex } = useRecoilValue(currentSelector);

  const isLeapYear = Boolean(year % 4 === 0);
  const [_, setCurrentDate] = useState<number>(1);
  const currentMonthEndDays = useMemo(() => {
    return isLeapYear ? LEAP_YEAR_END_DAY_LIST : NOT_LEAP_YEAR_END_DAY_LIST;
  }, [isLeapYear]);
  const currentMonthFirstDay = useMemo(() => {
    return new Date(year, monthIndex, 1).getDay();
  }, [monthIndex, year]);
  const weekCount = Math.ceil(
    (currentMonthFirstDay + currentMonthEndDays[monthIndex]) / 7
  );

  const prevMonthLastDate =
    monthIndex === 0
      ? currentMonthEndDays[11]
      : currentMonthEndDays[monthIndex - 1];

  const handleDateChange = (day: number) => {
    setCurrentDate(day);
  };

  return (
    <>
      <div className="text-gray-800" onClick={drawPrevCalendar}>
        이전
      </div>
      <div onClick={drawNextCalendar}>다음</div>
      <div onClick={drawTodayCalendar}>오늘의 달력 화면으로</div>
      <div>
        {year} {month}
      </div>
      <table id="calendar" className="calendar paper">
        <thead className="calendar__day">
          <tr>
            <th className="text-red-600 text-center">SUN</th>
            <th className="text-center">MON</th>
            <th className="text-center">TUE</th>
            <th className="text-center">WED</th>
            <th className="text-center">THU</th>
            <th className="text-center">FRI</th>
            <th className="text-blue-600 text-center">SAT</th>
          </tr>
        </thead>
        <tbody id="calendar__date" className="calendar__date">
          {Array.from({ length: weekCount }).map((_, weekOrder) => {
            const startDay = weekOrder * 7 - currentMonthFirstDay + 1;
            return (
              <WeekRowComponent
                key={weekOrder}
                startDay={startDay}
                prevMonthLastDate={prevMonthLastDate}
                monthEndDate={currentMonthEndDays[monthIndex]}
                onDateChange={handleDateChange}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CalendarComponent;
