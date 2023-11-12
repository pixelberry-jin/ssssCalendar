import React, { useState, useMemo, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  LEAP_YEAR_END_DAY_LIST,
  MONTH_LIST,
  NOT_LEAP_YEAR_END_DAY_LIST,
} from "@/constants";
import WeekRowComponent from "./WeekRow";
import { currentSelector } from "@/selectors/currentSelector";
import { useDrawCalendar } from "@/hooks/useDrawCalendar";
import WeekHead from "./WeekHead";

interface IProps {
  year: number;
  month: number;
  monthIndex: number;
}

export default function CalendarTableComponent({
  year,
  month,
  monthIndex,
}: IProps) {
  const { drawTodayCalendar, drawNextCalendar, drawPrevCalendar } =
    useDrawCalendar();
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
    <div className="pb-10">
      <div className="flex justify-start">
        <button className="text-gray-800" onClick={drawPrevCalendar}>
          이전
        </button>
        <button onClick={drawNextCalendar}>다음</button>
        <button onClick={drawTodayCalendar}>오늘의 달력 화면으로</button>
      </div>
      <div className="pt-6 pb-4 text-2xl text-center font-bold">
        {MONTH_LIST[monthIndex]} {year}
      </div>
      <table id="calendar" className="calendar paper table-fixed">
        <thead className="calendar__day">
          <WeekHead />
        </thead>
        <tbody id="calendar__date" className="calendar__date">
          {Array.from({ length: weekCount }).map((_, weekOrder) => {
            const startDay = weekOrder * 7 - currentMonthFirstDay + 1;
            return (
              <WeekRowComponent
                key={weekOrder}
                year={year}
                month={month}
                startDay={startDay}
                prevMonthLastDate={prevMonthLastDate}
                monthEndDate={currentMonthEndDays[monthIndex]}
                onDateChange={handleDateChange}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
