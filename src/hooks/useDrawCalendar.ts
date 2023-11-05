import { currentAtom } from "@/atoms/currentAtom";
import { todaySelector } from "@/selectors";
import { currentSelector } from "@/selectors/currentSelector";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useDrawCalendar = () => {
  const { year, monthIndex } = useRecoilValue(currentSelector);
  const { year: todayYear, monthIndex: todayMonthIndex } =
    useRecoilValue(todaySelector);
  const setCurrent = useSetRecoilState(currentAtom);

  const drawTodayCalendar = () => {
    setCurrent({
      year: todayYear,
      month: todayMonthIndex + 1,
      monthIndex: todayMonthIndex,
    });
  };

  const drawNextCalendar = () => {
    const next = new Date(year, monthIndex + 1);
    const newYear = next.getFullYear();
    const newMonthIndex = next.getMonth();
    setCurrent({
      year: newYear,
      month: newMonthIndex + 1,
      monthIndex: newMonthIndex,
    });
  };

  const drawPrevCalendar = () => {
    const prev = new Date(year, monthIndex - 1);
    const newYear = prev.getFullYear();
    const newMonthIndex = prev.getMonth();
    setCurrent({
      year: newYear,
      month: newMonthIndex + 1,
      monthIndex: newMonthIndex,
    });
  };

  return { drawTodayCalendar, drawNextCalendar, drawPrevCalendar };
};
